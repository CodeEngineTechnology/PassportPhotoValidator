import React, { Component } from 'react';
import {Button,Form, FormGroup} from 'reactstrap';
import FileBase64 from "react-file-base64";
import './Upload.css';

class Upload extends Component {
    constructor(props){
        super();
        this.state = { 
            files : [],
            Result : [],
            ifPerson : '',
        }
        
        this.fileUpload = this.fileUpload.bind(this);
    }

    getFiles(files){
        this.setState({files: files});
        console.log(files);
    }


    async fileUpload(){
        const response = await fetch ('https://1lwqomm8u3.execute-api.us-east-1.amazonaws.com/Prod/passportphoto', {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify({photo : this.state.files['base64']})
        }
         
        ) 

        const Result= await response.json();
        this.setState({Result:Result.body})
        const FaceDetails = JSON.parse(this.state.Result);

        if (FaceDetails['FaceDetails'][0] === undefined )
            this.setState({ifPerson : 'Sorry, Looks like you just uploaded an invalid photo!'})
            
        else {
            this.setState({ifPerson : 'Thanks for uploading your photo!'})
        }


    }


    render() { 
        const ifPerson=this.state.ifPerson
        return ( 
            
                <div>
                     <div className="row">
                        <div className="col-6 offset-3">
                            <h4>Passport Photo Validator!</h4>
                        </div>
                    </div>   


                    <div className="row">
                         <div className="files col-6 offset-3">
                            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
                        </div>
                    </div>   


                    <div className="row">
                        <div className="col-6 offset-3 ">
                              <img src={this.state.files.base64} width="40%" />
                        </div>
                    </div>   



                    <div className="row">
                        <div className="col-6 offset-3">
                            <Button className="btn btn-lg btn-danger btn-block" onClick={this.fileUpload} >Verify My Photo!</Button>
                        </div>
                    </div>                       

                    <div className="row">
                        <div className="col-6 offset-3">
                                {ifPerson}
                        </div>
                    </div>                       


                    

                </div>
         );
    }
}
 
export default Upload;