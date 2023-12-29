import {screensName} from '../../utils'

//Criação do data dos menus do Perfil para ajustes
export const AdjustsProfileMenu=[
    {
        title:"Change name and surname ",
        leftIcon:"emoticon-excited-outline",
        
        screen: screensName.account.changeName
    } ,
    {
        title: "Change email",
        leftIcon: "email-outline",
        screen: screensName.account.changeEmail,
        //email
      },
      {
        title: "Change Username",
        leftIcon: "card-account-details-outline",
        screen: screensName.account.changeUsername,
        //email
      },

      {
      title: "Change Password",
      leftIcon: "key-outline",
      screen: screensName.account.changePassword,
     //password
    },


]


export const orderProfileMenu = [
    {
      title: "Order",
      description: "My Orders",
      leftIcon: "order-bool-descending-variant",
      screen: screensName.account.orders,
      //list_alt
    },
    {
      title: "Address",
      description: "Manage your shipping addresses",
      leftIcon: "map-marker-outline",
      screen: screensName.account.addresses,
      //room
    },
    {
      title: "WishList",
      leftIcon: "heart-outline",
      screen: screensName.wishlist.root,
      //favorite
    },
  ];


