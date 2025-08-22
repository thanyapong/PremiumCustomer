import { Button, ButtonProps } from "@mui/material";

type PaymentMethodButtonProps = {
    isSelected: boolean;
    isDisabled?: boolean;
    startIcon: React.ReactNode;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
    isLast?: boolean;
} & Omit<ButtonProps, "startIcon" | "endIcon" | "children">;

const PaymentMethodButton = ({
    isSelected,
    isDisabled,
    startIcon,
    endIcon,
    children,
    isLast = false,
    ...buttonProps
}: PaymentMethodButtonProps) => {
    return (
        <Button
            fullWidth
            sx={{
                p: { xs: 2, sm: 3 },
                mt: { xs: 2, sm: 3 },
                mb: isLast ? 3 : 0,
                color: "#000",
                borderRadius: 2,
                border: isSelected ? "2px solid #1db0e6" : "2px solid #e0e0e0",
                backgroundColor: isSelected ? "#E6F8FF" : "#fff",
                justifyContent: "flex-start",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                "&:hover": { backgroundColor: "#f5f5f5" },
                "& .MuiButton-startIcon": {
                    marginLeft: 0,
                    marginRight: { xs: 8, sm: 10 },
                },
                "& .MuiButton-endIcon": {
                    marginLeft: { xs: 4, sm: 5 },
                    marginRight: 0,
                },
                whiteSpace: "normal",
                textAlign: "left",
                filter: isDisabled ? "grayscale(100%)" : "none",
            }}
            disableRipple
            disableFocusRipple
            startIcon={startIcon}
            endIcon={endIcon}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

export default PaymentMethodButton;
