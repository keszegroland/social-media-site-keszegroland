import { useEffect, useState } from "react";
import getToken from "../Utils/getToken";
import { JWTTokenType, MemberIdentity } from "../Types";
import OneMember from "../Components/People/OneMember";
import PageHeader from "../Components/PageHeader";

async function handleFetchAllMembers(token: JWTTokenType): Promise<MemberIdentity[]> {
  const response: Response = await fetch("/api/member/all", {
    headers: {
      "Authentication": `Bearer ${token}`
    }
  });
  const data: MemberIdentity[] = await response.json();
  return data;
}

function People() {
  const [members, setMembers] = useState<MemberIdentity[]>([]);
  const token = getToken();

  useEffect(() => {
    async function getAllMembers() {
      const data: MemberIdentity[] = await handleFetchAllMembers(token);
      setMembers(data);
    }
    getAllMembers();
  }, [token])

  return (
    <div className="grid grid-cols-1 gap-4 w-full h-full px-8 md:py-8 lg:px-20 xl:px-28">
      <PageHeader headerName="All Members" />
      <div className="h-full w-full lg:pb-8 mb-36 md:mb-0">
        <ul className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {members.map(member => (
            <OneMember key={member.publicId} member={member} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default People;