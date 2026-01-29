import {userServices} from "@/shared/lib/services/user.services";

export function useUser() {

  const userData =  userServices.getUser()

  const userName = userData?.name
  const userNameFirstLetter = userName?.slice(0, 1).toUpperCase()

  return {
    userName,
    userNameFirstLetter
  }

}