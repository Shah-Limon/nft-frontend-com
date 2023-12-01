import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Shared/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Admin/Dashboard";
import Footer from "./components/Shared/Footer/Footer";
import EmailThankYou from "./Pages/EmailThankYou";
import RequireAuth from "./components/Shared/RequireAuth";
import EditWebsite from "./Pages/Admin/EditWebsite";
import UserDashboard from "./Pages/UserDashboard";
import ReportSeo from "./Pages/ReportSeo";
import Packages from "./Pages/Admin/Packages";
import Package from "./Pages/Package";
import TotalOrders from "./Pages/Admin/TotalOrders";
import OrderAction from "./Pages/Admin/OrderAction";
import MyOrders from "./Pages/MyOrders";
import TotalSpend from "./Pages/TotalSpend";
import PayNow from "./Pages/PayNow";
import PendingPayment from "./Pages/PendingPayment";
import EditPackage from "./Pages/Admin/EditPackage";
import Setting from "./Pages/Admin/Setting";
import SettingPayment from "./Pages/Admin/SettingPayment";
import Updatepaypal from "./Pages/Admin/Updatepaypal";
import GeneralOption from "./Pages/Admin/GeneralOption";
import UpdateLogo from "./Pages/Admin/UpdateLogo";
import HomaPageSetting from "./Pages/Admin/HomaPageSetting";
import EditBanner from "./Pages/Admin/EditBanner";
import AboutUsEdit from "./components/HomePage/AboutUsEdit";
import SpecialityOptionEdit from "./components/HomePage/SpecialityOptionEdit";
import WhyChooseEdit from "./components/HomePage/WhyChooseEdit";
import EditRoadMaps from "./Pages/Admin/EditRoadMaps";
import TeamList from "./Pages/Admin/TeamList";
import TeamMemberEdit from "./Pages/Admin/TeamMemberEdit";
import UpdateTeamTitle from "./Pages/Admin/UpdateTeamTitle";
import TestimonialsList from "./Pages/Admin/TestimonialsList";
import TestimonialEdit from "./Pages/Admin/TestimonialEdit";
import TestimonialTitle from "./Pages/Admin/TestimonialTitle";
import FaqsList from "./Pages/Admin/FaqsList";
import EditFaqTitle from "./Pages/Admin/EditFaqTitle";
import FaqsEdit from "./Pages/Admin/FaqsEdit";
import FooterEdit from "./Pages/Admin/FooterEdit";
import EditFooterLink from "./Pages/Admin/EditFooterLink";
import EditSocialLinks from "./Pages/Admin/EditSocialLinks";
import BannerSliderList from "./Pages/Admin/BannerSliderList";
import EditBannerSlider from "./Pages/Admin/EditBannerSlider";
import OrderPending from "./Pages/Admin/OrderPending";
import PaymentPending from "./Pages/Admin/PaymentPending";
import AcceptedOrder from "./Pages/Admin/AcceptedOrder";
import PaymentsReceived from "./Pages/Admin/PaymentsReceived";
import OrdersCancelled from "./Pages/Admin/OrdersCancelled";
import PaymentsCancelled from "./Pages/Admin/PaymentsCancelled";
import PaymentsRefunded from "./Pages/Admin/PaymentsRefunded";
import AboutPage from "./Pages/AboutPage";
import PricePage from "./Pages/PricePage";
import ContactPage from "./Pages/ContactPage";
import ContactPageEdit from "./components/HomePage/ContactPageEdit";
import ContactUsMessages from "./components/HomePage/ContactUsMessages";
import SupportPage from "./Pages/SupportPage";
import TicketPage from "./Pages/TicketPage";
import HelpDesk from "./Pages/HelpDesk";
import HelpDeskAction from "./Pages/HelpDeskAction";
import TicketAction from "./Pages/TicketAction";
import SubscriptionMail from "./Pages/SubscriptionMail";
import CancelledPayment from "./Pages/CancelledPayment";
import ReceivedPayment from "./Pages/ReceivedPayment";
import PackageTitleEdit from "./Pages/Admin/PackageTitleEdit";
import ContactUsMessageRead from "./components/HomePage/ContactUsMessageRead";
import ContactMessageSuccessMessage from "./Pages/ContactMessageSuccessMessage";
import ContactUsMessagesUnread from "./components/HomePage/ContactUsMessagesUnread";
import ContactUsMessagesRead from "./components/HomePage/ContactUsMessagesRead";
import ManageUsers from "./Pages/Admin/ManageUsers";
import User from "./Pages/Admin/User";
import AuditRequest from "./Pages/Admin/AuditRequest";
import CompleteAuditRequest from "./Pages/Admin/CompleteAuditRequest";
import InCompleteAuditRequest from "./Pages/Admin/InCompleteAuditRequest";
import ViewTicketMessage from "./Pages/ViewTicketMessage";
import AdminRoute from "./components/Shared/AdminRoute";
import ManagerRoute from "./components/Shared/ManagerRoute";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import EditFeaturesPage from "./Pages/Admin/EditFeaturesPage";
import EditFeature from "./Pages/Admin/EditFeature";
import NewsLetterThank from "./Pages/NewsLetterThank";
import OpenTicket from "./Pages/OpenTicket";
import RepliedTicket from "./Pages/RepliedTicket";
import SolvedTicket from "./Pages/SolvedTicket";
import DeliveredOrders from "./Pages/Admin/DeliveredOrders";
import ErrorPage from "./Pages/ErrorPage";
import EditMetaInfo from "./Pages/Admin/EditMetaInfo";
import { useEffect, useState } from "react";
import CreateService from "./Pages/Admin/CreateService";
import ServiceDeleits from "./Pages/Admin/ServiceDeleits";
import EditService from "./Pages/Admin/EditService";
import ServicePackage from "./Pages/ServicePackage";
import AddServicePackage from "./Pages/AddServicePackage";
import EditServicePackage from "./Pages/Admin/EditServicePackage";
import EditServiceTitle from "./Pages/Admin/EditServiceTitle";
import ServicePage from "./Pages/ServicePage";

function App() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch("http://localhost:5000/meta-infomations");
        const data = await response.json();
        if (data && data.length > 0) {
          setMetadata(data[0]);
          updateMetadata(data[0]);
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }

    fetchMetadata();
  }, []);

  const updateMetadata = (metadata) => {
    if (metadata) {
      document.title = metadata.title || "Title";

      const descriptionMetaTag = document.querySelector(
        'meta[name="description"]'
      );
      if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute(
          "content",
          metadata.description || "Description"
        );
      } else {
        const newDescriptionMetaTag = document.createElement("meta");
        newDescriptionMetaTag.setAttribute("name", "description");
        newDescriptionMetaTag.setAttribute(
          "content",
          metadata.description || "Description"
        );
        document.head.appendChild(newDescriptionMetaTag);
      }

      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = metadata.img || "default_favicon.png";
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = metadata.img || "default_favicon.png";
        document.head.appendChild(newLink);
      }
    }
  };

  return (
    <body className="home-main header-fixed">
      <div className="wrapper">
        <NavBar></NavBar>
        <Routes>  
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          <Route path="/about-us" element={<AboutPage></AboutPage>}></Route>
          <Route path="/services" element={<ServicePage></ServicePage>}></Route>
          <Route path="/user-dashboard" element={<RequireAuth> <UserDashboard></UserDashboard></RequireAuth>}></Route>
          <Route path="/user-dashboard/support/" element={ <RequireAuth> <SupportPage></SupportPage></RequireAuth>}></Route> 
          <Route path="/user-dashboard/create-ticket/" element={<RequireAuth><TicketPage></TicketPage></RequireAuth>}></Route>
          <Route path="/user-dashboard/support/:id" element={<RequireAuth><TicketAction></TicketAction></RequireAuth>}></Route>
          <Route path="/user-dashboard/ticket/:id" element={<RequireAuth><ViewTicketMessage></ViewTicketMessage></RequireAuth>}></Route>
          <Route path="/user-dashboard/my-orders/"element={ <RequireAuth><MyOrders></MyOrders></RequireAuth>}></Route>
          <Route path="/user-dashboard/spend/"element={ <RequireAuth><TotalSpend></TotalSpend> </RequireAuth> }></Route>
          <Route path="/contact-us"  element={<ContactPage></ContactPage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route  path="/reset"  element={<ResetPassword></ResetPassword>}></Route>
          <Route  path="/update-password"  element={<UpdatePassword></UpdatePassword>} ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route  path="/submitted-website" element={   <RequireAuth>   <EmailThankYou></EmailThankYou> </RequireAuth> } ></Route>
          <Route  path="/news-letter-submit"  element={<NewsLetterThank></NewsLetterThank>}  ></Route>
          <Route   path="/message-sent-success"element={<ContactMessageSuccessMessage></ContactMessageSuccessMessage>  } ></Route>
          <Route  path="/report/:id"  element={<RequireAuth><ReportSeo></ReportSeo> </RequireAuth> } ></Route>
          <Route path="/package/:id" element={<RequireAuth><Package></Package></RequireAuth>}></Route>
          <Route  path="/package-title-edit/:id" element={ <RequireAuth>  <PackageTitleEdit></PackageTitleEdit> </RequireAuth> } ></Route>
          <Route path="/pay-now/:id" element={  <RequireAuth> <PayNow></PayNow></RequireAuth>}></Route>
          <Route path="/pending-payment/" element={<RequireAuth>  <PendingPayment></PendingPayment></RequireAuth> }></Route>
          <Route path="/cancelled-payment/:id" element={<RequireAuth>  <CancelledPayment></CancelledPayment></RequireAuth> }></Route>
          <Route path="/received-payment/:id" element={<RequireAuth><ReceivedPayment></ReceivedPayment> </RequireAuth> }></Route>
          <Route path="/admin/dashboard" element={<RequireAuth><ManagerRoute> <Dashboard></Dashboard> </ManagerRoute> </RequireAuth>}></Route>
          <Route path="/admin/help-desk" element={<RequireAuth><AdminRoute><HelpDesk></HelpDesk></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/help-desk/open-ticket" element={<RequireAuth><AdminRoute><OpenTicket></OpenTicket></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/help-desk/:id" element={<RequireAuth><AdminRoute><HelpDeskAction></HelpDeskAction></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/help-desk/replied-ticket" element={<RequireAuth><AdminRoute><RepliedTicket></RepliedTicket></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/help-desk/solved-ticket" element={<RequireAuth><AdminRoute><SolvedTicket></SolvedTicket></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/subscription-email/" element={<RequireAuth><AdminRoute><SubscriptionMail></SubscriptionMail></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/setting" element={<RequireAuth><AdminRoute><Setting></Setting></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/manage-users/" element={<RequireAuth><AdminRoute><ManageUsers></ManageUsers></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/user/:id" element={<RequireAuth><AdminRoute><User></User></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/setting-general/" element={<RequireAuth><AdminRoute><GeneralOption></GeneralOption></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/update-logo/:id" element={<RequireAuth><AdminRoute><UpdateLogo></UpdateLogo></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/setting-homepage" element={<RequireAuth><AdminRoute><HomaPageSetting></HomaPageSetting></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-banner-option/:id" element={<RequireAuth><AdminRoute><EditBanner></EditBanner></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/slider-banner/" element={<RequireAuth><AdminRoute><BannerSliderList></BannerSliderList></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-slider/:id" element={<RequireAuth><AdminRoute><EditBannerSlider></EditBannerSlider></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/feature-page/" element={<RequireAuth><AdminRoute><EditFeaturesPage></EditFeaturesPage></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-feature/:id" element={<RequireAuth><AdminRoute><EditFeature></EditFeature></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/about-edit/:id" element={<RequireAuth><AdminRoute><AboutUsEdit></AboutUsEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/speciality-edit/:id" element={<RequireAuth><AdminRoute><SpecialityOptionEdit></SpecialityOptionEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/why-choose-edit/:id" element={<RequireAuth><AdminRoute><WhyChooseEdit></WhyChooseEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/road-edit/:id" element={<RequireAuth><AdminRoute><EditRoadMaps></EditRoadMaps></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/team/" element={<RequireAuth><AdminRoute><TeamList></TeamList></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/team-edit/:id" element={<RequireAuth><AdminRoute><TeamMemberEdit></TeamMemberEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-team-title/:id" element={<RequireAuth><AdminRoute><UpdateTeamTitle></UpdateTeamTitle></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/packages" element={<RequireAuth><AdminRoute><Packages></Packages></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/package-edit/:id" element={<RequireAuth><AdminRoute><EditPackage></EditPackage></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/testimonials" element={<RequireAuth><AdminRoute><TestimonialsList></TestimonialsList></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/testimonial-edit/:id" element={<RequireAuth><AdminRoute><TestimonialEdit></TestimonialEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-testimonial-title/:id" element={<RequireAuth><AdminRoute><TestimonialTitle></TestimonialTitle></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/setting-footer" element={<RequireAuth><AdminRoute><FooterEdit></FooterEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-footer/:id" element={<RequireAuth><AdminRoute><EditFooterLink></EditFooterLink></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-social/:id" element={<RequireAuth><AdminRoute><EditSocialLinks></EditSocialLinks></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-contact-page/:id" element={<RequireAuth><AdminRoute><ContactPageEdit></ContactPageEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/contact-messages/" element={<RequireAuth><AdminRoute><ContactUsMessages></ContactUsMessages></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/contact-message-unread/" element={<RequireAuth><AdminRoute><ContactUsMessagesUnread></ContactUsMessagesUnread></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/contact-message-read/" element={<RequireAuth><AdminRoute><ContactUsMessagesRead></ContactUsMessagesRead></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/contact-message/:id" element={<RequireAuth><AdminRoute><ContactUsMessageRead></ContactUsMessageRead></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/faqs" element={<RequireAuth><AdminRoute><FaqsList></FaqsList></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/faq-edit/:id" element={<RequireAuth><AdminRoute><FaqsEdit></FaqsEdit></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/faqs-title/:id" element={<RequireAuth><AdminRoute><EditFaqTitle></EditFaqTitle></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/audit-request" element={<RequireAuth><ManagerRoute><AuditRequest></AuditRequest></ManagerRoute></RequireAuth>}></Route>
          <Route path="/admin/complete-audit-request/" element={<RequireAuth><ManagerRoute><CompleteAuditRequest></CompleteAuditRequest></ManagerRoute></RequireAuth>}></Route>
          <Route path="/admin/incomplete-audit-request/" element={<RequireAuth><ManagerRoute><InCompleteAuditRequest></InCompleteAuditRequest></ManagerRoute></RequireAuth>}></Route>
          <Route path="/admin/website-edit/:id" element={<RequireAuth><ManagerRoute><EditWebsite></EditWebsite></ManagerRoute></RequireAuth>}></Route>
          <Route path="/admin/orders" element={<RequireAuth><AdminRoute><TotalOrders></TotalOrders></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/order/:id" element={<RequireAuth><AdminRoute><OrderAction></OrderAction></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/orders-pending" element={<RequireAuth><AdminRoute><OrderPending></OrderPending></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/payments/pending" element={<RequireAuth><AdminRoute><PaymentPending></PaymentPending></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/orders/accepted" element={<RequireAuth><AdminRoute><AcceptedOrder></AcceptedOrder></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/payments/received" element={<RequireAuth><AdminRoute><PaymentsReceived></PaymentsReceived></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/orders/cancelled" element={<RequireAuth><AdminRoute><OrdersCancelled></OrdersCancelled></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/payments/cancelled" element={<RequireAuth><AdminRoute><PaymentsCancelled></PaymentsCancelled></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/payments/refunded" element={<RequireAuth><AdminRoute><PaymentsRefunded></PaymentsRefunded></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/orders/delivered" element={<RequireAuth><AdminRoute><DeliveredOrders></DeliveredOrders></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/setting-payment" element={<RequireAuth><AdminRoute><SettingPayment></SettingPayment></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/paypal/:id" element={<RequireAuth><AdminRoute><Updatepaypal></Updatepaypal></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-meta/:id" element={<RequireAuth><AdminRoute><EditMetaInfo></EditMetaInfo></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/services-list" element={<RequireAuth><AdminRoute><CreateService></CreateService></AdminRoute></RequireAuth>}></Route>
          <Route path="/service/:slug" element={<RequireAuth><AdminRoute><ServiceDeleits></ServiceDeleits></AdminRoute></RequireAuth>}></Route>


          <Route path="/admin/edit-service/:id" element={<RequireAuth><AdminRoute><EditService></EditService></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-service-title/:id" element={<RequireAuth><AdminRoute><EditServiceTitle></EditServiceTitle></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/add-service-package/:id" element={<RequireAuth><AdminRoute><AddServicePackage></AddServicePackage></AdminRoute></RequireAuth>}></Route>
          <Route path="/admin/edit-service-package/:id" element={<RequireAuth><AdminRoute><EditServicePackage></EditServicePackage></AdminRoute></RequireAuth>}></Route>

          <Route path="/service-package/:id" element={<RequireAuth><ServicePackage></ServicePackage></RequireAuth>}></Route>
        
        
        </Routes>

        <Footer></Footer>
      </div>
    </body>
  );
}

export default App;
