import React, { useRef } from "react";
import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import Breadcrumbs from "components/breadcrumb";
import Button from "components/button";
import Card from "components/card";
import TextInput from "components/textInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders, getCurrentUser } from "lib/auth";
import extractApiErrors from "lib/extractApiErrors";
import ApiErrorAlert from "components/project/apiErrorAlert";
import { useRouter } from "next/router";

interface CreateJobPageProps {
  willEditorRestart: boolean;
  accessToken: string;
}

const useCKEditor = () => {
  const editorRef = useRef<{ CKEditor: any; ClassicEditor: any }>();
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      // import
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return {
    ...(editorRef.current || {}),
    editorLoaded,
  };
};

const CreateJobPage = ({ willEditorRestart = true }: CreateJobPageProps) => {
  const { CKEditor, ClassicEditor, editorLoaded } = useCKEditor();

  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [startDateFocused, setStartDateFocused] = useState(false);
  const router = useRouter();

  const [
    expectedCompletionDate,
    setExpectedCompletionDate,
  ] = useState<moment.Moment>(moment());

  const [
    expectedCompletionDateFocused,
    setExpectedCompletionDateFocused,
  ] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: moment(),
      expectedCompletionDate: moment(),
      status: "pending",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: async (values, { setErrors }) => {
      console.log("onSubmit", values);

      try {
        const postJobRes = await axios.post<Job>(
          `${process.env.NEXT_PUBLIC_API_JOB}/jobs`,
          {
            title: formik.values.title,
            description: formik.values.description,
            startDate: formik.values.startDate.toDate(),
            expectedCompletionDate: formik.values.expectedCompletionDate.toDate(),
            user: getCurrentUser()._id,
            status: formik.values.status,
          },
          {
            headers: {
              ...getAuthHeaders(),
            },
          }
        );
        console.log("done submit", postJobRes);
        router.push(`/jobs/${postJobRes.data._id}`);

        return postJobRes.data;
      } catch (err) {
        console.log("caught error", err);

        setErrors(extractApiErrors(err));
      }
    },
  });

  return (
    <Layout headerRight={<MainMenu />}>
      <Breadcrumbs />
      <ApiErrorAlert errors={formik.errors} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="my-4">
          <h3>Create Job</h3>
          <h6>Title</h6>
          <TextInput
            name={"title"}
            label={"Title"}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={
              formik.errors.title && formik.touched.title && formik.errors.title
            }
          />
          {editorLoaded && (
            <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                formik.values.description = editor.getData();
              }}
              onBlur={(event, editor) => {
                formik.values.onBlur = editor.getData();
              }}
              onError={() => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if (willEditorRestart)
                  CKEditor.ui.view.toolbar.element.remove();
              }}
            />
          )}
          <TextInput
            name={"description"}
            label={"Description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.errors.description &&
              formik.touched.description &&
              formik.errors.description
            }
          />
          <SingleDatePicker
            date={startDate} // momentPropTypes.momentObj or null
            onDateChange={(date) => {
              setStartDate(date);
              formik.values.startDate = startDate;
            }} // PropTypes.func.isRequired
            focused={startDateFocused} // PropTypes.bool
            onFocusChange={({ focused }) => setStartDateFocused(focused)} // PropTypes.func.isRequired
          />
          <SingleDatePicker
            date={expectedCompletionDate} // momentPropTypes.momentObj or null
            onDateChange={(date) => {
              setExpectedCompletionDate(date);
              formik.values.expectedCompletionDate = expectedCompletionDate;
            }} // PropTypes.func.isRequired
            focused={expectedCompletionDateFocused} // PropTypes.bool
            onFocusChange={({ focused }) =>
              setExpectedCompletionDateFocused(focused)
            } // PropTypes.func.isRequired
          />
          <Button type={"submit"} text="Create Job" />
        </Card>
      </form>
    </Layout>
  );
};

export default CreateJobPage;
