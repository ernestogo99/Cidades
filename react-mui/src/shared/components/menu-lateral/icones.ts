import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { SvgIconComponent } from "@mui/icons-material";
import { Star } from "@mui/icons-material";

const iconMapping: Record<string, SvgIconComponent> = {
  home: HomeIcon,
  info: InfoIcon,
  star: Star,
  contact_mail: ContactMailIcon,
};

export default iconMapping;
