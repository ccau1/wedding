import Card from "components/card";
import Spacer from "components/spacer";
import { motion } from "framer-motion";
import { getCurrentUser } from "lib/auth";
import withCurrentUser from "lib/withCurrentUser";
import { useRouter } from "next/router";

interface RoleItem {
  text: string;
  value: string;
  icon: string;
}

const roles: RoleItem[] = [
  {
    text: "Designer",
    value: "designer",
    icon: "/images/stock-photo.jpeg",
  },
  {
    text: "Constructor",
    value: "constructor",
    icon: "/images/stock-photo.jpeg",
  },
  {
    text: "Project Manager",
    value: "project-manager",
    icon: "/images/stock-photo.jpeg",
  },
];

const MotionCard = motion(Card);

const RoleSelectPage = () => {
  const router = useRouter();
  const user = getCurrentUser();

  console.log("user", user);

  const onRoleSelect = (role: RoleItem) => {
    console.log("selected role", role);
    router.push(
      `/account/roles/select-success${
        router.query?.redirect && `?redirect=${router.query?.redirect}`
      }`
    );
  };

  return (
    <div className="h-full">
      <div className="relative flex flex-col h-full justify-center items-center z-10">
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Who are you
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            ?
          </motion.span>
        </motion.h4>
        <Spacer height={40} />
        <motion.div
          className="flex flex-row w-full justify-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {roles.map((role) => (
            <MotionCard
              key={role.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-2 w-80"
              image={role.icon}
              onClick={() => onRoleSelect(role)}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
            >
              <p className="text-center pt-1 -mb-4">{role.text}</p>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelectPage;

export const getServerSideProps = withCurrentUser(async ({ req }) => {
  return {
    props: {},
  };
});
