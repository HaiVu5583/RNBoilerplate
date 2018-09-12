import React from 'react'
import { Surface, Text, Icon } from '~/src/themes/ThemeComponent'
import Image from 'react-native-fast-image'
import { maskBankAccount, getElevation } from '~/src/utils'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { SURFACE_STYLES } from '~/src/themes/common'
import Ripple from 'react-native-material-ripple';

export default class BankAccountItem extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _handlePressAddCard = () => {
        console.log('Handle Press AddCard')
    }

    render() {
        const { bankImage, expireDate, bankName, bankAccount, active = false, onPress } = this.props
        if (active) {
            return (
                <Ripple onPress={onPress} rippleColor={'white'}>
                    <LinearGradient
                        colors={['rgba(29,119,187,1)', 'rgba(41,170,225,0.85)']}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 1.0, y: 0.0 }}
                        locations={[0.0, 1.0]}
                        style={{
                            ...styles.container,
                            ...SURFACE_STYLES.rowStart,
                            ...getElevation(4),
                            marginHorizontal: 2,
                            marginTop: 2,
                            marginBottom: 5
                        }}
                    >
                        <Image
                            source={{ uri: bankImage }}
                            style={styles.image}
                        />
                        <Surface columnAlignEnd flex themeable={false}>
                            <Text description white>{bankName}</Text>
                            <Text description white>{maskBankAccount(bankAccount)}</Text>
                            <Text description white>VALID {expireDate}</Text>
                        </Surface>
                    </LinearGradient>
                </Ripple>
            )
        }
        return (
            <Ripple onPress={onPress} rippleColor={'white'}>
                <Surface rowStart style={{
                    ...styles.container,
                    marginHorizontal: 2,
                    marginTop: 2,
                    marginBottom: 5
                }}>
                    <Image
                        source={{ uri: bankImage }}
                        style={styles.image}
                    />
                    <Surface columnAlignEnd flex themeable={false}>
                        <Text description>{bankName}</Text>
                        <Text description>{maskBankAccount(bankAccount)}</Text>
                        <Text description>VALID {expireDate}</Text>
                    </Surface>
                </Surface>
            </Ripple>
        )
    }
}