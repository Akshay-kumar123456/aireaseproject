import HeroComponent from "../Customer/components/home/hero";
import Navexecutive from "./navexe";

function ExecutiveDashboard(){

    return(
        <div>
            <h1>
              <Navexecutive/>
              <HeroComponent/>
            </h1>
        </div>
    );
}
export default ExecutiveDashboard;