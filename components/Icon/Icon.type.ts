import { SvgProps } from "react-native-svg";

export enum IconNames {
  Aml = "aml",
  At = "at",
  Back = "back",
  Camera = "camera",
  Cake = "cake",
  Card = "card",
  Check = "check",
  ChevronRight = "chevronright",
  Clipboard = "clipboard",
  Clock = "clock",
  Close = "close",
  Download = "download",
  EgmDetails = "egmdetails",
  Exit = "exit",
  Expand = "expand",
  FlipCamera = "flipcamera",
  Floorplan = "floorplan",
  Forbidden = "forbidden",
  Gate = "gate",
  Image = "image",
  Language = "language",
  Locator = "locator",
  Lock = "lock",
  Logout = "logout",
  NameTag = "nametag",
  Notification = "notification",
  MachineStatus = "machinestatus",
  Occupancy = "occupancy",
  Person = "person",
  PersonLogin = "personLogin",
  PiggyBank = "piggyBank",
  Prize = "prize",
  Retry = "retry",
  Search = "search",
  Settings = "settings",
  Shield = "shield",
  Video = "video",
  Warning = "warning",
}

export enum IconSizes {
  SuperTiny = "superTiny",
  ExtraTiny = "extraTiny",
  Tiny = "tiny",
  Small = "small",
  Normal = "normal",
  Large = "large",
  ExtraLarge = "extraLarge",
  Huge = "huge",
  ExtraHuge = "extraHuge",
  ExtraExtraHuge = "extraExtraHuge",
  Gigantic = "gigantic",
}

export interface IconProps extends SvgProps {
  name: IconNames;
  width?: number;
  height?: number;
  size?: IconSizes;
}
