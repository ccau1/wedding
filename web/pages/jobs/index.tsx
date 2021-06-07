import Layout from "@layouts/mainLayout";
import Card from "components/card";
import Link from "next/link";
import React from "react";
import MainMenu from "@layouts/_menus/mainMenu";
import withCurrentUser from "lib/withCurrentUser";
import axios from "axios";
import qs from "qs";
import extractApiErrors from "lib/extractApiErrors";
import ApiErrorAlert from "components/project/apiErrorAlert";
import { AnimateSharedLayout, motion } from "framer-motion";
import Head from "next/head";
import { getAuthHeaders } from "lib/auth";

interface JobsProps {
  jobs: PaginateResult<Job>;
  user: User;
  errors?: {
    __global?: string;
    statusCode?: number;
    [key: string]: string | number;
  };
}

const Jobs = ({ jobs, user, errors }: JobsProps) => {
  const deleteJob = (job: Job) => {};

  return (
    <Layout headerRight={<MainMenu />} contentClassName="flex flex-col">
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME} - My Jobs</title>
      </Head>
      <ApiErrorAlert errors={errors} />
      <AnimateSharedLayout>
        {jobs?.docs.length > 0 && (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2">
            {jobs.docs.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`}>
                <a style={{ maxHeight: 281 }}>
                  <Card
                    title={job.title}
                    text={job.description}
                    actions={[
                      {
                        text: "Delete",
                        onClick: () => deleteJob(job),
                        className: `bg-red-500 text-white`,
                      },
                    ]}
                    className={`mt-2 w-full`}
                  />
                </a>
              </Link>
            ))}
            <Link href={`/jobs/create`}>
              <motion.a layoutId="create-job">
                <Card
                  className={`mt-2 h-full w-full bg-transparent shadow-none bg-white`}
                >
                  <div className="flex items-center justify-center h-full">
                    <p className="text-8xl text-gray-300">+</p>
                  </div>
                </Card>
              </motion.a>
            </Link>
          </div>
        )}
        {jobs?.docs.length === 0 && (
          <div className="flex flex-1 flex-row justify-center items-center">
            <Link href={`/jobs/create`}>
              <motion.a layoutId="create-job" className="w-3/4 cursor-pointer">
                <h4 className="text-center font-light">Start a new job</h4>
                <Card className={`mt-2 bg-transparent bg-white shadow-lg`}>
                  <div className="flex items-center justify-center h-full">
                    <p className="text-8xl text-gray-300">+</p>
                  </div>
                </Card>
              </motion.a>
            </Link>
          </div>
        )}
      </AnimateSharedLayout>
    </Layout>
  );
};

export default Jobs;

export const getServerSideProps = withCurrentUser(
  async ({ user, accessToken }) => {
    // instantiate server side props
    const props: JobsProps = {
      user,
      jobs: undefined,
      errors: undefined,
    };

    try {
      // define jobs api query
      const queries = {
        me: true,
      };
      // get jobs from API
      const jobsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_JOB}/jobs?${qs.stringify(queries)}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      // set jobs result to props
      props.jobs = jobsResponse.data;
    } catch (err) {
      // if error, extract errors into standardized structure
      props.errors = extractApiErrors(err);
    }

    // return server props
    return { props };
  }
);
