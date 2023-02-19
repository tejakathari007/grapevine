import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(5, 'Too Short!'),
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(5, 'Too Short!'),
  fname: Yup.string().required('Required').min(3, 'Too Short!'),
  lname: Yup.string().required('Required').min(3, 'Too Short!'),
  number: Yup.number().required('Required').min(5, 'Too Short!'),
  address: Yup.string().required('Required').min(5, 'Too Short!'),
});

const RegisterBrandSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(5, 'Too Short!'),
  brand_name: Yup.string().required('Required').min(3, 'Too Short!'),
  number: Yup.number().required('Required').min(5, 'Too Short!'),
  address: Yup.string().required('Required').min(5, 'Too Short!'),
});

const RegisterAgencySchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(5, 'Too Short!'),
  agency_name: Yup.string().required('Required').min(3, 'Too Short!'),
  number: Yup.number().required('Required').min(5, 'Too Short!'),
  address: Yup.string().required('Required').min(5, 'Too Short!'),
});

module.exports = {
  SignupSchema,
  RegisterSchema,
  RegisterBrandSchema,
  RegisterAgencySchema,
};
