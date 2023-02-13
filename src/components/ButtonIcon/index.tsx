import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./style";
import { ButtonIconTypeStyleProps } from "./style";

type Props = TouchableOpacityProps & {
    name: string,
    type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ name, type = 'PRIMARY', ...rest }: Props) {
    return(
        <Container {...rest}>
        <Icon 
            name={name}
            type={type}
            />
        </Container>
    )
}