import { Container, Logo, BackButton, BackIcon } from "./style";
import LogoImg from "@assets/logo.png";

import { useNavigation } from '@react-navigation/native';

type Props = {
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.navigate('groups')
    }

    return(
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={LogoImg} />
        </Container>
    )
}