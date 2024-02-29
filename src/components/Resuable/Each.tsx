import { Children } from "react";

interface EachProps {
  render: (item: any, index?: number) => JSX.Element;
  of: any[];
}

const Each: React.FC<EachProps> = ({ render, of }) =>
  Children.toArray(of.map((item, index) => render(item, index)));

export default Each;
