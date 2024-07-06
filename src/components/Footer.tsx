import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="h-16 flex items-center justify-center bg-customCard">
            <h3 className="flex items-center gap-2">
                Developed by:
                <Link
                    to="https://github.com/nerwinalamas"
                    target="_blank"
                    className="hover:underline"
                >
                    <span>Nerwin Alamas</span>
                </Link>
            </h3>
        </div>
    );
};

export default Footer;
