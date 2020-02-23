import React from 'react';
import '../App.css';
import './PracticeChallenge.css';
class Practice_challenge2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctopt: '',
      wrongopt: '',
      answercorrect: 'hidden',
      answerwrong: 'hidden'
    }


  }
  correctoptfun() {
    //alert('hi')
    var cs = (this.state.answercorrect === "hidden") ? "show" : "hidden";
    this.setState({ "answercorrect": cs });
    var cs = (this.state.answerwrong === "hidden") ? "hidden" : "hidden";
    this.setState({ "answerwrong": cs });
    var css = (this.state.correctopt === "") ? "correctoption" : "";
    this.setState({ "correctopt": css });
  }
  wrongoptfun() {
    //alert('hi')
    var cs = (this.state.answerwrong === "hidden") ? "show" : "hidden";
    this.setState({ "answerwrong": cs });
    var cs = (this.state.answercorrect === "hidden") ? "hidden" : "hidden";
    this.setState({ "answercorrect": cs });
    var css = (this.state.wrongopt === "") ? "wrongoption" : "";
    this.setState({ "wrongopt": css });
    var css1 = (this.state.correctopt === "") ? "correctoption" : "correctoption";
    this.setState({ "correctopt": css1 });
  }

  render() {


    return (
      <div className="P">
        <title>Bebras </title>
        <meta charset="UTF-8"></meta>


        <div id="main" class="wrap">

          <section class="page-top wrap">

            <h2 class="page-section-title">Try out these practice challenges.</h2>

          </section>
          <div class="zz-bottom"></div>
          <section class=" margin-t72 wrap">
            <div class="dist"></div>
            {/* questionstartshere */}
            <div class="container">
              <div class="row">
                <div class="col-md-2">
                  {/* side div */}
</div>
                <div class="col-md-8">
                  <div class="row">
                    <p>Four footprints have been found in the mud.<br></br>
                      The police are looking for a robber who wore shoes with these properties:<br></br>
                      • The soles have a stripy pattern<br></br>
                      • The heel is thin <br></br>
                      Question:
Choose the set of shoe prints that could belong to the robber.</p>
                  </div>
                  <div class="row">

                    <div class="col-md-3"><button onClick={this.wrongoptfun.bind(this)}><img className={this.state.wrongopt} src={require('../images/PracChallenge/shoe1.PNG')}></img></button></div>
                    <div class="col-md-3"><button onClick={this.wrongoptfun.bind(this)}><img className={this.state.wrongopt} alt="oops" src={require('../images/PracChallenge/shoe2.PNG')}></img></button></div>
                    <div class="col-md-3"><button onClick={this.wrongoptfun.bind(this)}><img className={this.state.wrongopt} alt="oops" src={require('../images/PracChallenge/shoe3.PNG')}></img></button></div>
                    <div class="col-md-3"><button onClick={this.correctoptfun.bind(this)}><img className={this.state.correctopt} alt="oops" src={require('../images/PracChallenge/shoe4.PNG')}></img></button></div>

                  </div>
                  <div class="dist"></div>
                  <div className={this.state.answercorrect} style={{ "backgroundColor": "green" }}>
                    <p style={{ "color": "white" }}>Amazing! You got the question right!</p>
                  </div>
                  <div className={this.state.answerwrong} style={{ "backgroundColor": "red" }}>
                    <p style={{ "color": "white" }}>Oops! Better luck next time!</p>
                  </div>
                  <div class="dist"></div>
                </div>
              </div>
            </div>
            {/* questionendsshere */}
          </section>

        </div>
      </div>
    );
  }
}

export default Practice_challenge2;
