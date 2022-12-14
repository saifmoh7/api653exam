import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faArrowLeft, 
  faBars, 
  faCheck, 
  faCircleCheck, 
  faCircleInfo, 
  faCircleQuestion, 
  faHouse,
  faReply, 
  faXmark,
  faRightToBracket,
  faUserPlus,
  faSignIn,
  faSignOut,
  faHome,
  faTrashCan,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';


const Icon = (props) => {
   const icons = {
       'login' : faRightToBracket,
       'arrow-back' : faArrowLeft,
       'close' : faXmark,
       'check' : faCheck,
       'c-check' : faCircleCheck,
       'replay' : faReply,
       'home' : faHouse,
       'menu' : faBars,
       'detail' : faCircleInfo,
       'signup' : faUserPlus,
       'signin' : faSignIn,
       'signout' : faSignOut,
       'circle-question':faCircleQuestion,
       'home' : faHome,
       'upgrade' : faUpload,
       'delete' : faTrashCan
   }
   let { icon , ...attr } = props
  return <TouchableOpacity onPress={typeof props.onPress === 'function' ? props.onPress : () => {}}>
    <FontAwesomeIcon icon={icons[icon]||icons['circle-question']}  { ...attr } />
  </TouchableOpacity>
}

export default Icon;