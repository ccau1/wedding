import Alert from "components/alert";
import TemplateLayout from "@layouts/templateLayout";
import Spacer from "components/spacer";

const AlertTemplate = () => {
  return (
    <TemplateLayout>
      <Alert text="Look at me! I'm an alert!" />
      <Spacer height={10} />
      <Alert
        text="Look at me! I'm an alert with close button!"
        onCloseClick={() => alert("closing alert")}
      />
      <Spacer height={10} />
      <Alert
        text="Look at me! I'm an alert with content!"
        content="Mauris commodo odio id augue hendrerit semper. Praesent ante augue, fringilla a tellus eget, euismod tincidunt magna. Nam lacinia fermentum commodo. Donec cursus, mauris in sodales faucibus, metus dui rutrum nulla, ac porttitor elit massa nec augue. Vivamus dignissim quam a sagittis dapibus. Pellentesque ante nibh, molestie eu ante elementum, vulputate scelerisque turpis. Mauris a arcu metus."
      />
      <Spacer height={10} />
      <Alert
        text="Look at me! I'm an alert with collapsible content!"
        content="Mauris commodo odio id augue hendrerit semper. Praesent ante augue, fringilla a tellus eget, euismod tincidunt magna. Nam lacinia fermentum commodo. Donec cursus, mauris in sodales faucibus, metus dui rutrum nulla, ac porttitor elit massa nec augue. Vivamus dignissim quam a sagittis dapibus. Pellentesque ante nibh, molestie eu ante elementum, vulputate scelerisque turpis. Mauris a arcu metus."
        collapsible
      />
      <Spacer height={10} />
      <Alert
        text="Look at me! I'm an alert with default collapsed content!"
        content="Mauris commodo odio id augue hendrerit semper. Praesent ante augue, fringilla a tellus eget, euismod tincidunt magna. Nam lacinia fermentum commodo. Donec cursus, mauris in sodales faucibus, metus dui rutrum nulla, ac porttitor elit massa nec augue. Vivamus dignissim quam a sagittis dapibus. Pellentesque ante nibh, molestie eu ante elementum, vulputate scelerisque turpis. Mauris a arcu metus."
        collapsible
        initialCollapse={true}
      />
      <Spacer height={10} />
      <Alert text="Look at me! I'm a danger alert!" type="danger" />
      <Spacer height={10} />
      <Alert text="Look at me! I'm a success alert!" type="success" />
      <Spacer height={10} />
      <Alert text="Look at me! I'm an info alert!" type="info" />
    </TemplateLayout>
  );
};

export default AlertTemplate;
