import Login from "../Pages/SignedOutPages/Login";
import Register from "../Pages/SignedOutPages/Register/Register";
import LoginSignup from "../Pages/SignedOutPages/LoginSignup";
import ExplorePage from "../Pages/SignedInPages/Explore";
import Explore2Page from "../Pages/SignedInPages/Explore2";
import BrandCreator from "../Pages/SignedOutPages/BrandCreator";
import Community from "../Pages/SignedInPages/Community";
import EnterPhoneNumber from "../Pages/SignedOutPages/EnterPhoneNumber";
import EnterCode from "../Pages/SignedOutPages/EnterCode";
import EnterUsername from "../Pages/SignedOutPages/EnterUsername";
import Home from "../Pages/SignedInPages/Home";
import Notification from "../Pages/SignedInPages/Notification";
import ContinueWith from "../Pages/SignedOutPages/ContinueWith";
import EnterEmail from "../Pages/SignedOutPages/EnterEmail";
import ConnectNetworks from "../Pages/SignedOutPages/ConnectNetworks";
import Messages from "../Pages/SignedInPages/Messages";
import InterestsBrand from "../Pages/SignedOutPages/Interests/IntrestsBrand";
import IntrestsCreator from "../Pages/SignedOutPages/Interests/IntrestsCreator";
import InterestsAgency from "../Pages/SignedOutPages/Interests/IntrestsAgency";
import AccountType from "../Pages/SignedOutPages/AccountType";
import EnterDob from "../Pages/SignedOutPages/EnterDob";
import UploadPostPage from "../Pages/SignedInPages/Post";
import ChatRoom from "../Pages/SignedInPages/ChatRoom";
import Register_Brand from "../Pages/SignedOutPages/Register/Register_Brand";
import Register_Agency from "../Pages/SignedOutPages/Register/Register_Agency";
import Post_Instagram_Tiktok_Youtube from "../Pages/SignedInPages/Post_Instagram_Tiktok_Youtube";
import Explore3 from "../Pages/SignedInPages/Explore3";
import Explore4 from "../Pages/SignedInPages/Explore4";
import FriendRequest from "../Pages/SignedInPages/FriendRequest";
import AuthProfile from "../Pages/SignedInPages/Profile/AuthProfile";
import OwnProfile from "../Pages/SignedInPages/Profile/OwnProfile";
import ActivityPage from "../Pages/SignedInPages/ActivityPage";
import CommentPage from "../Pages/SignedInPages/CommentPage";
import EditProfile from "../Pages/SignedInPages/Profile/EditProfile";
import PostPage from "../Pages/SignedInPages/PostPage";
import AllCreatorPage from "../Pages/SignedInPages/AllCreatorPage";
import AllFeaturesUserPage from "../Pages/SignedInPages/AllFeaturesUserPage";
import Share_Post from "../Pages/SignedInPages/SharePost";
import CreateGroup from "../Pages/SignedInPages/CreateGroup";
import BusinessAccountOptions from "../Pages/SignedOutPages/BusinessAccountOptions";
import DescribeYouCreator from "../Pages/SignedOutPages/DescribeYou/DescribeYouCreator";
import DescribeYouBrand from "../Pages/SignedOutPages/DescribeYou/DescribeYouBrand";
import SearchForBrand from "../Pages/SignedOutPages/SearchForBrand";
import EnterJobTitle from "../Pages/SignedOutPages/EnterJobTitle";
import ProductPage from "../Pages/SignedInPages/ProductPage";
import Setting from "../Pages/SignedInPages/Profile/Setting";
import Activity from "../Pages/SignedInPages/Profile/Activity";
import Insights from "../Pages/SignedInPages/Profile/Insights";
import Wallet from "../Pages/SignedInPages/Profile/Wallet";
import CollaborationHistory from "../Pages/SignedInPages/Profile/CollaborationHistory";
import AddGrapes from "../Pages/SignedInPages/Profile/AddGrapes";
export const signedInRoutes = [
  {
    routeName: "Notification",
    component: Notification,
  },
  {
    routeName: "Messages",
    component: Messages,
  },
  {
    routeName: "CommentPage",
    component: CommentPage,
  },
  {
    routeName: "PostPage",
    component: PostPage,
  },
  {
    routeName: "FriendRequest",
    component: FriendRequest,
  },
  {
    routeName: "FriendProfile",
    component: AuthProfile,
  },
  {
    routeName: "Chatroom",
    component: ChatRoom,
  },
  {
    routeName: "Post_Instagram_Tiktok_Youtube",
    component: Post_Instagram_Tiktok_Youtube,
  },
  {
    routeName: "Edit_Profile",
    component: EditProfile,
  },
  {
    routeName: "AllCreatorPage",
    component: AllCreatorPage,
  },
  {
    routeName: "AllFeaturesUserPage",
    component: AllFeaturesUserPage,
  },
  { routeName: "SharePost", component: Share_Post },
  { routeName: "CreateGroup", component: CreateGroup },
  { routeName: "ProductPage", component: ProductPage },
  { routeName: "Setting", component: Setting },
  { routeName: "MyActivity", component: Activity },
  { routeName: "Insights", component: Insights },
  { routeName: "Wallet", component: Wallet },
  { routeName: "CollaborationHistory", component: CollaborationHistory },
  { routeName: "AddGrapes", component: AddGrapes },
];

export const TabRoutes = [
  {
    routeName: "Home",
    component: Home,
  },
  {
    routeName: "Search",
    component: ExplorePage,
  },
  {
    routeName: "Add",
    component: UploadPostPage,
  },
  {
    routeName: "Activity",
    component: ActivityPage,
  },
  { routeName: "Profile", component: OwnProfile },
];

export const signedOutRoutes = [
  {
    routeName: "LoginSignup",
    component: LoginSignup,
  },

  {
    routeName: "Login",
    component: Login,
  },

  {
    routeName: "Register",
    component: Register,
  },
  {
    routeName: "Register_Brand",
    component: Register_Brand,
  },
  {
    routeName: "Register_Agency",
    component: Register_Agency,
  },
  {
    routeName: "EnterPhoneNumber",
    component: EnterPhoneNumber,
  },
  {
    routeName: "EnterEmail",
    component: EnterEmail,
  },
  {
    routeName: "EnterCode",
    component: EnterCode,
  },
  {
    routeName: "EnterUsername",
    component: EnterUsername,
  },
  {
    routeName: "BrandCreator",
    component: BrandCreator,
  },
  {
    routeName: "InterestsBrand",
    component: InterestsBrand,
  },
  {
    routeName: "InterestsCreator",
    component: IntrestsCreator,
  },
  {
    routeName: "InterestsAgency",
    component: InterestsAgency,
  },
  {
    routeName: "ContinueWith",
    component: ContinueWith,
  },
  {
    routeName: "ConnectNetworks",
    component: ConnectNetworks,
  },
  {
    routeName: "AccountType",
    component: AccountType,
  },
  {
    routeName: "EnterDob",
    component: EnterDob,
  },
  {
    routeName: "BusinessAccountOptions",
    component: BusinessAccountOptions,
  },
  {
    routeName: "DescribeYouCreator",
    component: DescribeYouCreator,
  },
  {
    routeName: "DescribeYouBrand",
    component: DescribeYouBrand,
  },
  { routeName: "SearchForBrand", component: SearchForBrand },
  { routeName: "EnterJobTitle", component: EnterJobTitle },
];
