import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import TemplateMenu from "@layouts/_menus/templateMenu";
import Breadcrumbs from "components/breadcrumb";
import React from "react";
import TemplateLayout from "@layouts/templateLayout";

const TypographyPage = () => {
  return (
    <TemplateLayout>
      <h1>H1 text here</h1>
      <h2>H2 text here</h2>
      <h3>H3 text here</h3>
      <h4>H4 text here</h4>
      <h5>H5 text here</h5>
      <h6>H6 text here</h6>
      <br />
      <br />
      <p>p text here</p>
      <p>
        <strong>strong</strong> <i>italic</i> text here
      </p>
      <small>small text here</small>
      <br />
      <label>label text here</label>
    </TemplateLayout>
  );
};

export default TypographyPage;
