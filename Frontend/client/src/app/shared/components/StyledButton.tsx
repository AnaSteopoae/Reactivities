import {  styled, type ButtonProps, Button } from "@mui/material";
import { type LinkProps } from 'react-router'; 

type StyledButtonProps = ButtonProps & Partial<LinkProps>;

const StyleButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.text.disabled,
    }
}));

export default StyleButton;