import { useEffect, useState } from "react";
import { JWTTokenType } from "../Types/PostTypes";
import OneMember from "../Components/People/OneMember";
import PageHeader from "../Components/PageHeader";
import { MemberIdentity } from "../Types/MemberTypes";
import { useAuth } from "../Utils/AuthProvider";

async function handleFetchAllMembers(token: JWTTokenType): Promise<MemberIdentity[]> {
  const response: Response = await fetch("/api/member/all", {
    headers: {
      'Authorization': "Bearer " + token
    }
  });
  const data: MemberIdentity[] = await response.json();
  return data;
}

function People() {
  const [members, setMembers] = useState<MemberIdentity[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    async function getAllMembers() {
      const data: MemberIdentity[] = await handleFetchAllMembers(token);
      setMembers(data);
    }
    getAllMembers();
  }, [token])

  return (
    <div className="grid grid-cols-1 gap-4 w-full h-full">
      <div className="h-full w-full px-8 md:py-8 lg:px-20 xl:px-42 2xl:px-60">
        <div className="w-full h-full flex flex-col md:gap-5">
          <PageHeader headerName="All Members" />
          <div className="h-full w-full lg:pb-8 mb-36 md:mb-0">
            <ul className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {members.map(member => (
                <OneMember key={member.memberPublicId} member={member} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default People;