const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const express = require("express");
const router = express.Router();
const path = require("path");
const { user, paymentHistory } = require("@subscriptions");
const { decryptToken, tokenIsValid } = require("../Utils/Token");
const { session } = require("passport");
router.get("/buy-grape", async (req, res) => {
  const { redirect, name, price, number, token } = req.query;
  try {
    const _user = await decryptToken(token)
      .then((data) => {
        if (tokenIsValid(token)) {
          return data.user;
        } else {
          throw Error("Invalid TOken");
        }
      })
      .catch((err) => {
        throw Error(err.message);
      });
    const history = await paymentHistory.create({
      user_uuid: _user.uuid,
      amount: parseInt(price),
      grapes: parseInt(number),
      status: "pending",
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: name,
            },
            unit_amount: parseInt(price) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.SERVER_URL}/stripe/success?redirect=${redirect}&history=${history.uuid}`,
      cancel_url: `${process.env.SERVER_URL}/stripe/failure?redirect=${redirect}`,
    });

    const updatedHistory = await paymentHistory.update({
      where: {
        uuid: history.uuid,
      },
      data: {
        sessionId: session.id,
      },
    });

    res.redirect(session.url);
  } catch (err) {
    console.log(err);
    res.redirect(`${redirect}?success=false`);
  }
});

router.get("/success", async (req, res) => {
  const { redirect, history } = req.query;
  console.log(redirect, history);
  try {
    const _history = await paymentHistory.update({
      where: {
        uuid: history,
      },
      data: {
        status: "success",
      },
    });
    const _user = await user.update({
      where: {
        uuid: _history.user_uuid,
      },
      data: {
        grapes: {
          increment: parseInt(_history.grapes),
        },
      },
    });
    res.redirect(`${redirect}?success=true`);
  } catch (err) {
    const _history = await paymentHistory.update({
      where: {
        uuid: history,
      },
      data: {
        status: "failed",
      },
    });
    res.redirect(`${redirect}?success=false`);
  }
});
router.get("/failure", (req, res) => {
  try {
    const { redirect } = req.query;
    res.redirect(`${redirect}?success=false`);
  } catch (err) {
    res.send("Somehing went wrong");
  }
});

module.exports = router;
