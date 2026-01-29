import './HomePage.scss'
import User from "@/features/user-profile/ui/User/User";
import Statistics from "@/features/stats/ui/Statistics/Statistics";

export default function HomePage() {
  return <>
    <User/>
    <Statistics/>
  </>;
}