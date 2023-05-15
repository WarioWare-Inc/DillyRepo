import { React, useEffect, useState } from 'react';
import Overview from './components/overview/Overview';
import QAIndex from './components/qs-and-as/index';
import RatingAndReview from './components/ratings-and-reviews/index';
import RelatedAndOutfit from './components/related-items-and-outfit/index';

function App() {
  const [productId, setProductId] = useState(40636);

  return (
    <div>
      {/* <Overview productId={productId} setProductId={setProductId} />
      <div><RelatedAndOutfit productId ={productId} setProductId = {setProductId}/></div> */}
      <div><QAIndex /></div>
      {/* <div><RatingAndReview productId={productId}/></div> */}
    </div>
  );
}

export default App;
