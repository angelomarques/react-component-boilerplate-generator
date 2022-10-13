export const getComponentMainFile = (
  componentName: string
) => `import React from "react";

const ${componentName} = () => {
    return <div>${componentName}</div>
}
    
export default ${componentName};`;

export const getComponentTestFile = (
  componentName: string
) => `import { render } from "@testing-library/react";
import ${componentName} from ".";

describe("${componentName} Component", () => {
    it("should render the component", () => {
      render(<${componentName} />);
    })
});
`;

export const getComponentIndexFile = (componentName: string) =>
  `export { default } from "./${componentName}";`;
