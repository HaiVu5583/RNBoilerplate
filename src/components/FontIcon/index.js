/**
 * MyIcon icon set component.
 * Usage: <MyIcon name="icon-name" size={20} color="#4F8EF7" />
 */
import { Animated } from 'react-native'
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
    "GB_internet": 59698,
    "GB_power": 59699,
    "GB_water": 59700,
    "GB_tv": 59701,
    "GB_copy": 59702,
    "GB_paycard": 59696,
    "GB_bank": 59697,
    "GB_clear": 59695,
    "GB_search": 59691,
    "GB_contact": 59692,
    "GB_cycle_plus": 59693,
    "GB_cycle_dash": 59694,
    "GB_plus": 59688,
    "GB_checked": 59689,
    "GB_trash": 59690,
    "GB_arrow_down": 59686,
    "GB_arrow_up": 59687,
    "GB_SMS": 59685,
    "GB_account1": 59684,
    "GB_right_sign": 59680,
    "GB_call": 59681,
    "GB_email": 59682,
    "GB_dot": 59683,
    "GB_arrow_left": 59668,
    "GB_arrow_right": 59669,
    "GB_eye_show": 59670,
    "GB_eye_hide": 59671,
    "GB_hamburger": 59672,
    "GB_notify": 59673,
    "GB_edit": 59674,
    "GB_pass": 59675,
    "GB_pass2": 59676,
    "GB_finger_print": 59677,
    "GB_close": 59678,
    "GB_alert": 59679,
    "GB_statement": 59667,
    "GB_recharge": 59661,
    "GB_recharge_phone": 59662,
    "GB_scratch_card": 59663,
    "GB_saving": 59664,
    "GB_pay_bill": 59665,
    "GB_mobile_tranfer": 59666,
    "GB_home": 59648,
    "GB_wallet": 59649,
    "GB_account": 59650,
    "mobile-money-in": 59651,
    "card": 59652,
    "save": 59653,
    "bill-pay": 59654,
    "money-tranfer": 59655,
    "GB_account-balance": 59656,
    "GB_history": 59657,
    "GB_payment-method": 59658,
    "GB_pass_code": 59659,
    "money-in": 59660
};
const iconSet = createIconSet(glyphMap, 'GB', 'GB.ttf');
export default iconSet

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;