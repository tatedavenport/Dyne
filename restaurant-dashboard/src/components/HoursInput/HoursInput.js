import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const styles = {
    divStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    }
}

class HoursInput extends React.Component {

    state = {
        sunday: {
            startTime: "",
            endTime: "",
            startMod: "PM",
            endMod: "AM",
        },
        monday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
        tuesday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
        wednesday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
        thursday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
        friday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
        saturday: {
            startTime: "",
            endTime: "",
            startMod: "AM",
            endMod: "AM",
        },
    }

    componentDidMount() {
        
    }

    onSundayStartChange = e => {
        let sunday = this.state.sunday;
        sunday.startTime = e.target.value;
        this.setState({sunday: sunday});
        this.props.onSundayHoursChange(sunday);
    }

    onSundayEndChange = e => {
        let sunday = this.state.sunday;
        sunday.endTime = e.target.value;
        this.setState({sunday: sunday});
        this.props.onSundayHoursChange(sunday);
    }

    onSundayStartModChange = e => {
        let sunday = this.state.sunday;
        sunday.startMod = e.target.value;
        this.setState({sunday: sunday});
        this.props.onSundayHoursChange(sunday);
    }

    onSundayEndModChange = e => {
        let sunday = this.state.sunday;
        sunday.endMod = e.target.value;
        this.setState({sunday: sunday});
        this.props.onSundayHoursChange(sunday);
    }

    onMondayStartChange = e => {
        let sunday = this.state.monday;
        sunday.startTime = e.target.value;
        this.setState({monday: sunday});
        this.props.onMondayHoursChange(sunday);
    }

    onMondayEndChange = e => {
        let sunday = this.state.monday;
        sunday.endTime = e.target.value;
        this.setState({monday: sunday});
        this.props.onMondayHoursChange(sunday);
    }

    onMondayStartModChange = e => {
        let sunday = this.state.monday;
        sunday.startMod = e.target.value;
        this.setState({monday: sunday});
        this.props.onMondayHoursChange(sunday);
    }

    onMondayEndModChange = e => {
        let sunday = this.state.monday;
        sunday.endMod = e.target.value;
        this.setState({monday: sunday});
        this.props.onMondayHoursChange(sunday);
    }

    onTuesdayStartChange = e => {
        let sunday = this.state.tuesday;
        sunday.startTime = e.target.value;
        this.setState({tuesday: sunday});
        this.props.onTuesdayHoursChange(sunday);
    }

    onTuesdayEndChange = e => {
        let sunday = this.state.tuesday;
        sunday.endTime = e.target.value;
        this.setState({tuesday: sunday});
        this.props.onTuesdayHoursChange(sunday);
    }

    onTuesdayStartModChange = e => {
        let sunday = this.state.tuesday;
        sunday.startMod = e.target.value;
        this.setState({tuesday: sunday});
        this.props.onTuesdayHoursChange(sunday);
    }

    onTuesdayEndModChange = e => {
        let sunday = this.state.tuesday;
        sunday.endMod = e.target.value;
        this.setState({tuesday: sunday});
        this.props.onTuesdayHoursChange(sunday);
    }

    onWednesdayStartChange = e => {
        let sunday = this.state.wednesday;
        sunday.startTime = e.target.value;
        this.setState({wednesday: sunday});
        this.props.onWednesdayHoursChange(sunday);
    }

    onWednesdayEndChange = e => {
        let sunday = this.state.wednesday;
        sunday.endTime = e.target.value;
        this.setState({wednesday: sunday});
        this.props.onWednesdayHoursChange(sunday);
    }

    onWednesdayStartModChange = e => {
        let sunday = this.state.wednesday;
        sunday.startMod = e.target.value;
        this.setState({wednesday: sunday});
        this.props.onWednesdayHoursChange(sunday);
    }

    onWednesdayEndModChange = e => {
        let sunday = this.state.wednesday;
        sunday.endMod = e.target.value;
        this.setState({wednesday: sunday});
        this.props.onWednesdayHoursChange(sunday);
    }

    onThursdayStartChange = e => {
        let sunday = this.state.thursday;
        sunday.startTime = e.target.value;
        this.setState({thursday: sunday});
        this.props.onThursdayHoursChange(sunday);
    }

    onThursdayEndChange = e => {
        let sunday = this.state.thursday;
        sunday.endTime = e.target.value;
        this.setState({thursday: sunday});
        this.props.onSundayHoursChange(sunday);
    }

    onThursdayStartModChange = e => {
        let sunday = this.state.thursday;
        sunday.startMod = e.target.value;
        this.setState({thursday: sunday});
        this.props.onThursdayHoursChange(sunday);
    }

    onThursdayEndModChange = e => {
        let sunday = this.state.thursday;
        sunday.endMod = e.target.value;
        this.setState({thursday: sunday});
        this.props.onThursdayHoursChange(sunday);
    }

    onFridayStartChange = e => {
        let sunday = this.state.friday;
        sunday.startTime = e.target.value;
        this.setState({friday: sunday});
        this.props.onFridayHoursChange(sunday);
    }

    onFridayEndChange = e => {
        let sunday = this.state.friday;
        sunday.endTime = e.target.value;
        this.setState({friday: sunday});
        this.props.onFridayHoursChange(sunday);
    }

    onFridayStartModChange = e => {
        let sunday = this.state.friday;
        sunday.startMod = e.target.value;
        this.setState({friday: sunday});
        this.props.onFridayHoursChange(sunday);
    }

    onFridayEndModChange = e => {
        let sunday = this.state.friday;
        sunday.endMod = e.target.value;
        this.setState({friday: sunday});
        this.props.onFridayHoursChange(sunday);
    }

    onSaturdayStartChange = e => {
        let sunday = this.state.saturday;
        sunday.startTime = e.target.value;
        this.setState({saturday: sunday});
        this.props.onSaturdayHoursChange(sunday);
    }

    onSaturdayEndChange = e => {
        let sunday = this.state.saturday;
        sunday.endTime = e.target.value;
        this.setState({saturday: sunday});
        this.props.onSaturdayHoursChange(sunday);
    }

    onSaturdayStartModChange = e => {
        let sunday = this.state.saturday;
        sunday.startMod = e.target.value;
        this.setState({saturday: sunday});
        this.props.onSaturdayHoursChange(sunday);
    }

    onSaturdayEndModChange = e => {
        let sunday = this.state.saturday;
        sunday.endMod = e.target.value;
        this.setState({saturday: sunday});
        this.props.onSaturdayHoursChange(sunday);
    }


    render() {
        return (
            <div style={{boxShadow: "1px 1px 1px grey", marginTop: "1rem"}}>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Sunday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onSundayStartChange} value={this.props.sunday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onSundayStartModChange}
                        value={this.props.sunday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onSundayEndChange} value={this.props.sunday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onSundayEndModChange}
                        value={this.props.sunday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Monday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onMondayStartChange} value={this.props.monday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onMondayStartModChange}
                        value={this.props.monday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onMondayEndChange} value={this.props.monday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onMondayEndModChange}
                        value={this.props.monday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Tuesday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onTuesdayStartChange} value={this.props.tuesday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onTuesdayStartModChange}
                        value={this.props.tuesday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onTuesdayEndChange} value={this.props.tuesday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onTuesdayEndModChange}
                        value={this.props.tuesday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Wednesday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onWednesdayStartChange} value={this.props.wednesday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onWednesdayStartModChange}
                        value={this.props.wednesday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onWednesdayEndChange} value={this.props.wednesday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onWednesdayEndModChange}
                        value={this.props.wednesday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Thursday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onThursdayStartChange} value={this.props.thursday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.onThursdayStartModChange}
                        value={this.state.thursday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onThursdayEndChange} value={this.props.thursday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onThursdayEndModChange}
                        value={this.props.thursday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Friday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onFridayStartChange} value={this.props.friday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onFridayStartModChange}
                        value={this.props.friday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onFridayEndChange} value={this.props.friday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onFridayEndModChange}
                        value={this.props.friday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
                <div style={styles.divStyle}>
                    <Typography style={{flex: "5"}}>
                        Saturday
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onSaturdayStartChange} value={this.props.saturday.startTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onSaturdayStartModChange}
                        value={this.props.saturday.startMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                    <Typography style={{flex: "1", marginLeft: "1.5rem", marginRight: "1rem"}}>
                        until
                    </Typography>
                    <TextField style={{flex:"2"}} onChange={this.props.onSaturdayEndChange} value={this.props.saturday.endTime}/>
                    <Select
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                        style={{flex: "1", marginLeft: "1.5rem"}}
                        onChange={this.props.onSaturdayEndModChange}
                        value={this.props.saturday.endMod}
                    >
                        <option value={"AM"}>
                            AM
                        </option>
                        <option value={"PM"}>
                            PM
                        </option>
                    </Select>
                </div>
            </div>
        )
    }
}

export default HoursInput;