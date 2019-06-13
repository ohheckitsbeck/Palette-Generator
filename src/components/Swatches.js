import React from 'react';

//Copy hex code to clipboard
const copyToClipboard = (current, props) => {
  const text = document.createElement('textarea')
  text.value = current;
  text.setAttribute('readonly', '');
  document.body.appendChild(text);

  text.select();
  document.execCommand('copy');

  document.body.removeChild(text);
};

//Swatches
function Swatches(props) {
  const swatches = props.swatches.map((item) =>
    <li
      key={item.index}
      className="palette-generator__swatch"
      onClick={() => copyToClipboard(`${item.swatch}`, props)}
    >
      <span
        className="swatch"
        style={{ backgroundColor: item.swatch }}
      ></span>
      {item.swatch}
    </li>
  );
  return (
    <div
      className="palette-generator__swatches"
    >
      <ul>{swatches}</ul>
    </div>
  );
}

export default Swatches;