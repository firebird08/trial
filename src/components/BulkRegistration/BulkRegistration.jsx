import React from 'react';
import Select from 'react-select';
import './BulkRegistration.css';
import { userService } from '../../services/user.service';
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './type';
import XLSX from 'xlsx';
const optionschool = [];
const optionschoolclass = [];
const optionschoolcmp = [];
const columns = [
  {
  name: "name",
  label: "Name",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "company",
  label: "Company",
  options: {
   filter: true,
   sort: false,
  }
 },
 {
  name: "city",
  label: "City",
  options: {
   filter: true,
   sort: false,
  }
 },
 {
  name: "state",
  label: "State",
  options: {
   filter: true,
   sort: false,
  }
 },
 {
   name: "Add",
   options: {
     filter: true,
     sort: false,
     customBodyRender: (value, tableMeta, updateValue) => {
       return (
         <button onClick={() => window.alert(`Clicked "Add" for row ${tableMeta.rowIndex}`)}>
           Add
         </button>
       );
     }
   }
 },
];
const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};
const optionslanguage = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
];

class BulkRegistration extends React.Component {
 


  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      showHideSidenav:'hidden',
      showstep2:'hidden',
      showstep3:'hidden',
      user: [],
      fileName: '',
      school: '',
      schoolclass: '',
      competition: '',
      language: '',
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeSchool = this.onChangeSchool.bind(this);
    this.onChangeSchoolClass = this.onChangeSchoolClass.bind(this);
    this.onChangeCmp = this.onChangeCmp.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.getUserdata = this.getUserdata.bind(this);
  }

  download() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "SheetJS",
      Subject: "Test",
    };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [['First Name', 'Last Name', 'Gender', 'BirthDate', 'Class No.']];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    var save = document.getElementById("download").value;

    var FileSaver = require('file-saver');
    var blob = new Blob([save], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'BebrasChallenge.xlsx');

  }

  handleChange(e) {

    const files = e.target.files;
    console.log(files, files[0])
    this.state.fileName = files[0];
    if (files && files[0]) this.setState({ file: files[0] });
    var name = document.getElementById('fileexcel');
    window.confirm("Do you want to upload this file\n\n" + name.files.item(0).name);
  };


  handleFile() {
    console.log(this.state.fileName)
    if (this.state.fileName) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      if (rABS) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      };

      reader.onload = (e) => {

        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });

        // const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
          console.log(JSON.stringify(this.state.data, null, 2));
        });
        localStorage.setItem('bulkdata', JSON.stringify(this.state.data, null, 2));
        userService.doBulkRegister().then(
          user => {

            console.log(user);

          },
          error => {
            console.log(error);

          }
        );

        Swal.fire({
          imageUrl: require('../../images/success.gif'),
          imageAlt: 'Custom Image',
          title: "Succesfully Uploaded ",
          showConfirmButton: true,
          timer: 1500000
        });
      };
    } else {
      Swal.fire({
        imageUrl: require('../../images/failure.gif'),
        imageAlt: 'Custom Image',
        title: "Please choose a File ",
        showConfirmButton: true,
        timer: 1500000
      });
    }

  }



  onChangeSchool(optionSelected) {

    this.state.school = optionSelected.value;
    // console.log(optionSelected.value)
    var arry;
    userService.getSchoolClasses(this.state.school).then(
      array2 => {
        arry = array2;
        console.log(arry);
        arry.forEach(function (element) {
          optionschoolclass.push({ label: element, value: element })
        });
      },
      error => {
        console.log(error);

      }
    );
  }
  onChangeLanguage(optionSelected) {

    this.state.language = optionSelected.value;
    // console.log(optionSelected.value);
  }
  onChangeCmp(optionSelected) {

    this.state.competition = optionSelected.value;
    // console.log(optionSelected.value);
  }
  onChangeSchoolClass(optionSelected) {

    this.state.schoolclass = optionSelected.value;
    // console.log(optionSelected.value);
    var arry;
    userService.getCmp_Names(this.state.school, this.state.schoolclass).then(
      array2 => {
        arry = array2;
        console.log(arry);
        arry.forEach(function (element) {
          optionschoolcmp.push({ label: element, value: element })
        });
      },
      error => {
        console.log(error);

      }
    );
  }
  getUserdata(optionSelected) {



    userService.getNamesUsers().then(
      user => {
        document.getElementById("user").innerHTML = { user };
        console.log(user);

      },
      error => {
        console.log(error);

      }
    );
  }
  toggleSidenav() {
    //alert('hi')
    var css = (this.state.showHideSidenav === "hidden") ? "show" : "hidden";
    this.setState({ "showHideSidenav": css });
  }
  togglestep2() {
    //alert('hi')
    var css = (this.state.showstep2 === "hidden") ? "show" : "hidden";
    this.setState({ "showstep2": css });
  }
  togglestep3() {
    //alert('hi')
    var css = (this.state.showstep3 === "hidden") ? "show" : "hidden";
    this.setState({ "showstep3": css });
  }
  render() {
 const { selectedOption, school, user } = this.state;
    return (

      <div className="BulkRegistration ">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div class="bluesection">
          <h1 class="bluecontent">Students</h1>
          <div class="zz-bottom"></div>
        </div>


        <div class="containerbulkreg">
          <div class="row">
            <label style={{ "margin-left": "45%" }} class="label1">USERS HERE:</label>
            <button style={{ "margin-left": "46%" }} onClick={this.getUserdata}>Userdata</button>
          </div>
          <div class="dist"></div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-sm-2"><label class="label1">Select school:</label></div>
            <div class="col-md-6">
              <Select
                // value={selectedOption}
                name="school"
                onChange={this.onChangeSchool}
                placeholder="Select school"
                options={optionschool}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-sm-2"><label class="label1">Select class:</label></div>
            <div class="col-md-6">
              <Select

                onChange={this.onChangeSchoolClass}
                placeholder="Select class "
                options={optionschoolclass}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-sm-2"><label class="label1">Select competition:</label></div>
            <div class="col-md-6">
              <Select

                onChange={this.onChangeCmp}
                placeholder="Select competition "
                options={optionschoolcmp}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-sm-2"><label class="label1">Select Language:</label></div>
            <div class="col-md-6">
              <Select

                onChange={this.onChangeLanguage}
                placeholder="Select Language "
                options={optionslanguage}
              />
            </div>
          </div>


          <div class="dist"></div>

          <div class="containerreg1">
            <div class="rowdata">

              <MUIDataTable
                title={"STUDENT LIST"}
                data={data}
                columns={columns}
                options={options}

              />

            </div>

          </div>
          <div class="dist"></div>
          <div class='row' >
          <b style={{"margin-left":"30%"}}>DO YOU WANT TO REGISTER MORE STUDENTS?</b>
          <button style={{"margin-left":"3%"}} onClick={this.toggleSidenav.bind(this)} id="showbulk" >YES</button>
         
        </div>
        
        </div>
      
      <div className={this.state.showHideSidenav} >
        <div class="bluesection1">
          <h1 class="bluecontent">Dear Teacher!</h1>
          <h3 class="bluecontent">Bulk Registration is also Available!</h3>
           <div class="containerupload">
          <div class="uploadbuttons">
          <a style={{"font-size":"20px"}}> <b>STEP 1:</b><i class="fa fa-arrow-circle-down"></i></a>
              <div  className={this.state.showstep}>
                <label><b>Click on the button to download the excel sheet, fill it with student data:</b> </label>
                <button value="Download" onClick={this.download} id="download">Download</button>
              </div><br></br>
              <a onClick={this.togglestep2.bind(this)} style={{"font-size":"20px"}}><b>STEP 2:</b> <i class="fa fa-arrow-circle-down"></i></a>
              <div  className={this.state.showstep2}>
                <label><b>Choose the same excel file which you have downloaded: </b></label>
                <input type="file" name="MyFile" id="fileexcel" accept={SheetJSFT} onChange={this.handleChange} multiple />
              </div><br></br>
              <a onClick={this.togglestep3.bind(this)} style={{"font-size":"20px"}}><b>STEP 3:</b> <i class="fa fa-arrow-circle-down"></i></a>
              <div  className={this.state.showstep3}>
                <label><b>Click upload to register students, a sheet will be downloaded containing student login credentials:</b></label>
                <button value="Upload" onClick={this.handleFile} id="upload">Upload</button>
              </div>
            </div>
          
      
         
            {/* <marquee behavior="scroll" direction="left"><b>NOTE: Please download the template excel file, fill in all columns for the student and upload THE SAME file</b></marquee> */}

            
            
          </div>
          <div class="zz-bottom"></div>
          </div>
          
        </div>
      </div>

    );
  }
  componentDidMount() {
//alert("ok",this.state.showHideSidenav);

    var arry = ["India"];
    userService.getSchoolNames().then(
      array2 => {
        arry = array2;

        arry.forEach(function (element) {
          optionschool.push({ label: element, value: element })
        });
      },
      error => {
        console.log(error);

      }
    );
  this.state.showHideSidenav="hidden" ;


  }

}

export default BulkRegistration;