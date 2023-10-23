interface ButtonProps {
    className?: string,
    type?: "button" | "reset" | "submit" | undefined,
    label?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button: React.FC<ButtonProps> = ({ className, type, label, onClick }) => {

    return (
        <button className={className} type={type} onClick={onClick}>
            {label}
        </button>
    );
};