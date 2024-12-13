import { useEffect, useState } from "react";
import { JWTTokenType } from "../../../Types/PostTypes";
import MemberImage from "../../People/MemberImage";
import { MemberIdentity } from "../../../Types/MemberTypes";
import useAuth from "../../../Utils/UseAuth";

async function fetchSignedInMemberIdentity(token: JWTTokenType): Promise<MemberIdentity> {
  const res: Response = await fetch("/api/member/identity", {
    headers: {
      'Authorization': "Bearer " + token
    }
  });
  const data: MemberIdentity = await res.json();
  return data;
}

function MemberBadge() {
  const [memberDetails, setMemberDetails] = useState<MemberIdentity | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function getSignedInMemberIdentity() {
      const data: MemberIdentity = await fetchSignedInMemberIdentity(token);
      setMemberDetails(data);
    }
    getSignedInMemberIdentity();
  }, [token])


  return (
    <div className="hidden md:flex md:flex-row md:pl-3 md:gap-3 md:w-full md:justify-start md:text-lg">
      {memberDetails && (
        <>
          <MemberImage firstName={memberDetails.firstName} lastName={memberDetails.lastName} imageColor={memberDetails.imageColor} />
          <div className="md:flex md:flex-col md:items-start">
            <p className="md:font-bold md:leading-3 md:mb-1">{memberDetails.firstName} {memberDetails.lastName}</p>
            <p className="md:text-sm md:leading-3">@{memberDetails.username}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default MemberBadge;