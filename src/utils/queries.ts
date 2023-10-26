import { gql } from "@apollo/client";
import { fragments } from "./fragments";

const GET_CURRENT_USER = gql`
  query Me {
    me {
      ...UserFull_User
    }
  }
  ${fragments.user.userFull}
`;
const GET_CURRENT_USER_FULL = gql`
  query Me {
    me {
      ...UserFull_User
    }
  }
  ${fragments.user.userFull}
`;
const GET_CURRENT_USER_SETTING = gql`
  query Me {
    me {
      id
      type {
        name
      }
      UserSetting {
        id
        settingName
        settingValue
      }
    }
  }
`;
const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotification($userId: Int) {
    getUserNotification(userId: $userId) {
      id
      type
      image
      content
      viewed
    }
  }
`;
const SAVE_SETTING_FOR_USER = gql`
  mutation SaveSetting($settingName: String!, $settingValue: String!) {
    saveSetting(settingName: $settingName, settingValue: $settingValue) {
      settingName
    }
  }
`;
const NEW_NOTIFICATION = gql`
  subscription NewInternalNotification($userId: Int!) {
    newInternalNotification(userId: $userId) {
      userId
      content
      notificationsCount
    }
  }
`;
const GET_SUPER_ADMIN_SETTINGS = gql`
  query GetSuperAdminSettings {
    getSuperAdminSettings {
      settingName
      settingValue
    }
  }
`;
const GET_PAYMENTS_SETTINGS = gql`
  query GetPaymentsSettings {
    getPaymentsSettings {
      settingName
      settingValue
    }
  }
`;
const GET_SOCIAL_MEDIA_LINKS = gql`
  query GetSocialMediaLinks {
    getSocialMediaLinks {
      settingName
      settingValue
    }
  }
`;
const GET_PLATFORM_GENERAL_DATA = gql`
  query GetPlatformGeneralData {
    getPlatformGeneralData {
      settingName
      settingValue
    }
  }
`;
const SAVE_SUPER_ADMIN_SETTINGS = gql`
  mutation SaveAdminSetting($settings: [SuperAdminSetting]) {
    saveAdminSetting(settings: $settings)
  }
`;
const GET_USERS = gql`
  query GetUsers($search: String, $limit: Int, $offset: Int) {
    getUsers(search: $search, limit: $limit, offset: $offset) {
      ...UserPublic_User
    }
  }
  ${fragments.user.userPublic}
`;
const GET_USER_SETTING = gql`
  query GetUserSetting($userId: Int, $settingName: String!) {
    getUserSetting(userId: $userId, settingName: $settingName) {
      settingValue
    }
  }
`;
const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: String!) {
    uploadAvatar(avatar: $avatar)
  }
`;
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserPublic_User
      }
    }
  }
  ${fragments.user.userPublic}
`;
const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      ...UserPublic_User
    }
  }
  ${fragments.user.userPublic}
`;
const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($languageId: Int!) {
    deleteLanguage(languageId: $languageId)
  }
`;
const GET_ALL_SUBSCRIPTIONS = gql`
  query GetAllSubscriptions {
    getAllSubscriptions {
      endDate
      id
      plan {
        name
        id
        type
      }
      startDate
      invoice {
        gateway
        amount
        currency {
          name
        }
      }
      user {
        id
        email
        name
        avatar
      }
      userId
    }
  }
`;
const REGISTER_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $lang: String!
    $password: String!
    $sponsor: Int
  ) {
    createUser(
      username: $username
      email: $email
      password: $password

      lang: $lang
      sponsor: $sponsor
    ) {
      token
      user {
        email
        id
        username
        avatar
      }
    }
  }
`;
const CONNECT_STRIPE_WITH_PLAN = gql`
  mutation ConnectStripePlanWithLocalPlan($planId: Int!) {
    connectStripePlanWithLocalPlan(planId: $planId)
  }
`;
const GET_PLANS = gql`
  query GetAllPlans {
    getAllPlans {
      id
      name
      price
      oldPrice
      status
      description
      type
      settings {
        settingName
        settingValue
      }
      PlanCapabilities {
        planId
        name
        id
        count
        capabilitieId
        capabilitie {
          type
          name
          id
          description
        }
      }
    }
  }
`;
const DELETE_PLAN = gql`
  mutation DeletePlan($planId: Int) {
    deletePlan(planId: $planId)
  }
`;
const VIEWED_NOTIFICATIONS = gql`
  mutation Mutation {
    markNotificationsAsRead
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser(
    $email: String
    $username: String
    $name: String
    $password: String
    $avatar: String
    $resume: String
    $cover: String
    $avatarThumbnail: String
    $phone: String
    $country: String
    $state: String
    $city: String
    $languageId: Int
  ) {
    updateUser(
      email: $email
      username: $username
      name: $name
      password: $password
      avatar: $avatar
      cover: $cover
      resume: $resume
      avatar_thumbnail: $avatarThumbnail
      phone: $phone
      country: $country
      state: $state
      city: $city
      languageId: $languageId
    ) {
      email
      id
      username
      avatar
    }
  }
`;
const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
const CHECK_RESET_PASSWORD_CODE = gql`
  mutation CheckResetCode($email: String!, $resetCode: String!) {
    checkResetCode(email: $email, resetCode: $resetCode) {
      userId
    }
  }
`;
const UPDATE_PASSWORD_BY_USERID = gql`
  mutation UpdatePasswordByEmail($userId: Int!, $newPassword: String!) {
    updatePasswordByEmail(userId: $userId, newPassword: $newPassword)
  }
`;
const BUY_PLAN = gql`
  mutation BuyPlan($planId: Int!, $gateway: String) {
    buyPlan(planId: $planId, gateway: $gateway)
  }
`;
const GET_ADMIN_INVOICES = gql`
  query GetUserInvoice($userId: Int!) {
    getUserInvoice(userId: $userId) {
      amount
      createdAt
      currency {
        name
        id
      }
      currencyId
      gateway
      gatewayId
      id
      invoicePdfUrl
      invoiceUrl
      status
      updatedAt
      user {
        id
        name
        email
      }
    }
  }
`;
const BUY_PLAN_WITH_STRIPE = gql`
  mutation BuyPlanWithStripe(
    $planId: Int!
    $gateway: String
    $gatewayPayload: String!
  ) {
    buyPlanWithStripe(
      planId: $planId
      gateway: $gateway
      gatewayPayload: $gatewayPayload
    ) {
      clientSecret
      subscriptionId
    }
  }
`;

const CREATE_PLAN = gql`
  mutation CreatePlan(
    $description: String
    $planId: Int
    $price: Float
    $interval: String
    $name: String
    $oldPrice: Float
    $status: String
  ) {
    createPlan(
      planId: $planId
      description: $description
      price: $price
      interval: $interval
      name: $name
      oldPrice: $oldPrice
      status: $status
    ) {
      id
    }
  }
`;
const GET_KPIS = gql`
  query GetKpis($period: Int) {
    getKpis(period: $period) {
      id
      name
      type
      value
      createdAt
      updatedAt
    }
  }
`;
const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($name: String, $lng: String) {
    createLanguage(name: $name, lng: $lng) {
      name
    }
  }
`;

const CREATE_FRONTEND_COMPONENT = gql`
  mutation CreateFrontendCoponent(
    $name: String
    $data: String
    $action: String
    $id: Int
  ) {
    createFrontendCoponent(name: $name, data: $data, action: $action, id: $id)
  }
`;
const GET_FRONTEND_COMPONENTS = gql`
  query GetFrontendComponents($name: String, $language: String) {
    getFrontendComponents(name: $name, language: $language) {
      id
      name
      data
      type
      description
      Language {
        name
      }
    }
  }
`;
const GET_LANGUAGES = gql`
  query GetLanguages {
    getLanguages {
      id
      lng
      name
    }
  }
`;
const GET_CAPABILITIES = gql`
  query GetCapabilities {
    getAllCapabilities {
      description
      id
      name
      type
    }
  }
`;
const CREATE_CAPABILITIE = gql`
  mutation CreateCapabilitie(
    $name: String!
    $description: String
    $type: String
  ) {
    createCapabilitie(name: $name, description: $description, type: $type) {
      description
      name
      type
      id
    }
  }
`;
const DELETE_CAPABILITIE = gql`
  mutation DeleteCapabilitie($capabilitieId: Int!) {
    deleteCapabilitie(capabilitieId: $capabilitieId)
  }
`;
const GET_SUPPORT_TICKETS = gql`
  query GetSupportTickets {
    getSupportTickets {
      userId
      updatedAt
      subject
      status
      id
      departament
      createdAt
    }
  }
`;
const CONNECT_CAPABILITIE_WITH_PLAN = gql`
  mutation ConnectCapabilitieWithPlan(
    $planId: Int!
    $capabilitieId: Int!
    $count: Int
    $name: String
  ) {
    connectCapabilitieWithPlan(
      planId: $planId
      capabilitieId: $capabilitieId
      count: $count
      name: $name
    ) {
      planId
      name
      id
      count
      capabilitieId
    }
  }
`;
const GET_USER_SUPPORT_TICKETS = gql`
  query GetSupportTicketsForUser {
    getSupportTicketsForUser {
      createdAt
      departament
      id
      status
      subject
      updatedAt
      userId
    }
  }
`;
const DISCONECT_STRIPE_WITH_PLAN = gql`
  mutation DisconectStripePlanWithLocalPlan($planId: Int!) {
    disconectStripePlanWithLocalPlan(planId: $planId)
  }
`;
const GET_SUPPORT_TICKET = gql`
  query GetSupportTicket($ticketId: Int) {
    getSupportTicket(ticketId: $ticketId) {
      createdAt
      departament
      id
      status
      subject
      SupportTicketMessage {
        id
        createdAt
        userId
        user {
          id
          email
          avatar
          Membership {
            id
            plan {
              name
            }
          }
          name
          username
        }
        SupportTicketMessageContent {
          content
          type
          updatedAt
          createdAt
        }
      }
      updatedAt
      userId
    }
  }
`;
const ADD_MESSAGE_TO_SUPPORT_TICKET = gql`
  mutation CreateMessageForSupportTicket(
    $ticketId: Int!
    $contents: [SupportTicketContentInput]
  ) {
    createMessageForSupportTicket(ticketId: $ticketId, contents: $contents) {
      id
    }
  }
`;
const CLOSE_SUPPORT_TICKET = gql`
  mutation CloseSupportTicket($ticketId: Int!) {
    closeSupportTicket(ticketId: $ticketId)
  }
`;
const CREATE_SUPPORT_TICKET = gql`
  mutation CreateSupportTicket(
    $subject: String
    $departament: String
    $contents: [SupportTicketContentInput]
  ) {
    createSupportTicket(
      subject: $subject
      departament: $departament
      contents: $contents
    ) {
      id
    }
  }
`;
const GET_CURRENCIES = gql`
  query GetCurrencies {
    getCurrencies {
      rate
      name
      id
      code
    }
  }
`;
 
export {
  GET_CURRENCIES,
  DISCONECT_STRIPE_WITH_PLAN,
  CLOSE_SUPPORT_TICKET,
  GET_SUPPORT_TICKETS,
  GET_SUPPORT_TICKET,
  ADD_MESSAGE_TO_SUPPORT_TICKET,
  GET_USER_SUPPORT_TICKETS,
  CREATE_SUPPORT_TICKET,
  CONNECT_CAPABILITIE_WITH_PLAN,
  DELETE_CAPABILITIE,
  CREATE_CAPABILITIE,
  GET_CAPABILITIES,
  GET_PLATFORM_GENERAL_DATA,
  GET_SOCIAL_MEDIA_LINKS,
  DELETE_LANGUAGE,
  CREATE_LANGUAGE,
  CREATE_FRONTEND_COMPONENT,
  GET_FRONTEND_COMPONENTS,
  GET_ADMIN_INVOICES,
  CONNECT_STRIPE_WITH_PLAN,
  GET_PAYMENTS_SETTINGS,
  GET_KPIS,
  GET_ALL_SUBSCRIPTIONS,
  CREATE_PLAN,
  DELETE_PLAN,
  GET_SUPER_ADMIN_SETTINGS,
  SAVE_SUPER_ADMIN_SETTINGS,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD_BY_USERID,
  CHECK_RESET_PASSWORD_CODE,
  GET_CURRENT_USER_FULL,
  GET_CURRENT_USER_SETTING,
  UPDATE_USER,
  UPLOAD_AVATAR,
  GET_CURRENT_USER,
  LOGIN_USER,
  REGISTER_USER,
  GET_USERS,
  GET_USER,
  GET_LANGUAGES,
  SAVE_SETTING_FOR_USER,
  GET_USER_SETTING,
  GET_USER_NOTIFICATIONS,
  NEW_NOTIFICATION,
  VIEWED_NOTIFICATIONS,
  GET_PLANS,
  BUY_PLAN,
  BUY_PLAN_WITH_STRIPE,
};