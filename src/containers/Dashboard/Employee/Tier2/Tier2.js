import React,{Component} from 'react'


class Tier2 extends Component {

    componentDidMount=()=>{
            console.log('hey')
    }

    render(){
        return(
            <div>

                <table>
                    <thead>
                         <tr>
                             <th>Name</th>
                             <th>Role</th>
                             <th></th>
                         </tr>
                    </thead>

                    <tbody>
                         <tr>
                             <td>1</td>
                             <td>2</td>
                             <td>3</td>
                         </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}


export default Tier2