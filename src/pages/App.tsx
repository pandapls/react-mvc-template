import { useState } from "react";

const App = () => {
	const [data, setData] = useState({ info: 'Hello world' });
  return (
    <div>
      <h1
        className="text-4xl text-[#09F]"
        onClick={() => {
			console.log('object')
          setData({ info: 'Hello world' });
        }}
      >
        {data.info}
      </h1>
    </div>
  );
};
App.whyDidYouRender = true; // Enable WDYR for this component

export default App;
