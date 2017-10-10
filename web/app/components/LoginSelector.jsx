import React from "react";
import {Link} from "react-router";
import Translate from "react-translate-component";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";

if(localStorage.getItem("airbitz_backup_option")===null){
    localStorage.setItem("airbitz_backup_option","true")
}     

export default class LoginSelector extends React.Component {

    static contextTypes = {
        location: React.PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired
    };

    constructor(context){


        super();
        this.state={
            airbitz_backup_option:JSON.parse(localStorage.getItem("airbitz_backup_option"))
        };

        this.show_registration_choose = this.show_registration_choose.bind(this);        

    }

    componentDidUpdate() {
        if(this.state.airbitz_backup_option!==JSON.parse(localStorage.getItem("airbitz_backup_option"))){
            this.setState({
                airbitz_backup_option:JSON.parse(localStorage.getItem("airbitz_backup_option"))
            });
        }
    }

    onSelect(route) {
        this.props.router.push("/create-account/" + route);
    }


    show_registration_choose(e){
        e&&e.preventDefault&&e.preventDefault();
        localStorage.setItem("airbitz_backup_option","false")
        this.setState({
            airbitz_backup_option:false
        });
    }


    open_residents_confirm(type_registration_wallet,e){
        window._type_registration_wallet = type_registration_wallet;
        ZfApi.publish("residents_confirm", "open");       
    }

    render() {

        let { airbitz_backup_option } = this.state;

        console.log('@>airbitz_backup_option',airbitz_backup_option)

        if (this.props.children) {
            return this.props.children;
        }
        return (
            <div className="grid-content" style={{paddingTop: 30}}>
                <div className="create_account_index" >
                    {airbitz_backup_option ? <div>
                        <img src="/app/assets/logo.png" alt=""/>
                        <h1> OpenLedger </h1>
                        {/*<span>Blockchain Powered. People Driven.</span>*/}
                        <Translate content="wallet.welcome_to_the" component="h3"/>
                        <Translate content="wallet.create_account_description" component="p" unsafe />
                        {!airbitz_backup_option?<Translate content="wallet.login_type" component="h4" />:null}
                        </div>:null}

                    {!airbitz_backup_option?<div className="index_button_section" >
                        <Translate className="button" onClick={this.open_residents_confirm.bind(this,"wallet")} content="wallet.use_wallet" />
                        <Translate className="button" onClick={this.open_residents_confirm.bind(this,"password")} content="wallet.use_password" />
                    </div>:null}

                </div>

                {(()=>{
                    if(!airbitz_backup_option){
                        return (<div className="grid-block small-10 login-selector">
                            <div className="box small-12 large-6" onClick={this.onSelect.bind(this, "wallet")}>
                                <div className="block-content-header" style={{position: "relative"}}>
                                    <Translate content="wallet.wallet_model" component="h3" />
                                    <Translate content="wallet.wallet_model_sub" component="h4" />
                                </div>
                                <div className="box-content">
                                    {
                                    //<Translate content="wallet.wallet_model_1" component="p" /> 
                                    }
                                    <Translate content="wallet.wallet_model_2" component="p" />

                                    <Translate unsafe content="wallet.wallet_model_3" component="ul" />
                                </div>
                                {   
                                //<div className="button"><Link to="/create-account/wallet"><Translate content="wallet.use_wallet" /></Link></div>
                                }

                            </div>

                            <div className="box small-12 large-6 vertical" onClick={this.onSelect.bind(this, "password")}>
                                <div className="block-content-header" style={{position: "relative"}}>
                                    <Translate content="wallet.password_model" component="h3" />
                                    <Translate content="wallet.password_model_sub" component="h4" />
                                </div>
                                <div className="box-content">
                                    {
                                    //<Translate content="wallet.password_model_1" component="p" />
                                    }
                                    <Translate unsafe content="wallet.password_model_2" component="p" />
                                    <Translate unsafe content="wallet.password_model_3" component="ul" />
                                </div>
                                {
                                //<div className="button"><Link to="/create-account/password"><Translate content="wallet.use_password" /></Link></div>  
                                }
                            </div>
                        </div>);
                    }else{
                        return (<div className="grid-block small-10 login-selector">
                                    <div className="box-content">
                                        <div className="button create_acc_button" onClick={(e)=>{localStorage.setItem("airbitz_backup_option","true");this.open_residents_confirm("wallet")}} >
                                            <Translate unsafe content="wallet.airbitz_create_wallet" component="p" className="create_acc_button_p" />
                                        </div>
                                        <p className="create_acc_button_another" onClick={this.show_registration_choose} ><Translate content="wallet.create_without_airbitz" component="a" /></p>
                                    </div>
                                    <Translate unsafe content="wallet.airbitz_full_description" className="create_acc_airbitz_description" component="p" />
                                    <div className="create_acc_login">
                                        <Link to="/existing-account">
                                            <Translate unsafe content="wallet.have_an_old" component="span" />
                                        </Link>
                                    </div>
                                </div>);
                    }                    

                })()}             


            </div>
        );
    }
}
