import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import { GetServerSideProps } from "next";
import ErrorPage from "next/error";
import Card from "components/card";
import axios from "axios";
import extractApiErrors from "lib/extractApiErrors";
import ApiErrorAlert from "components/project/apiErrorAlert";

interface JobDetailPageProps {
  job: Job;
  errors: ApiError;
}

const JobDetail = ({ job, errors }: JobDetailPageProps) => {
  if (!job) {
    // job not found, return 404
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout headerRight={<MainMenu />}>
      {/* TODO: show job detail here */}
      <ApiErrorAlert errors={errors} />
      <Card className="mt-2">
        <h3>Job Detail: {job._id}</h3>
        <h4>title</h4>
        <p>{job.title}</p>
        <h4>description</h4>
        <p>{job.description}</p>
      </Card>
    </Layout>
  );
};

export default JobDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const jobId = params.id;
  const props: { job?: Job; errors?: ApiError } = {};
  // fetch job
  try {
    props.job = await (
      await axios.get(`${process.env.NEXT_PUBLIC_API_JOB}/jobs/${jobId}`)
    ).data;
  } catch (err) {
    props.errors = extractApiErrors(err);
  }

  return {
    props,
  };
};
