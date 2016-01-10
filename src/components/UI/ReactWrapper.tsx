import * as React from 'react'

abstract class ReactSample<T,S> extends React.Component<T, S> {
    constructor () {
        super();
    }

    abstract contents():JSX.Element;
    render(){
      let contents = this.contents();
      


      return (
        <div className="View-Window">
          <div className="View-Document">
            { contents }
          </div>
        </div>
      );
    }
}

export default ReactSample;
