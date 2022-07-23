<script data-info='hacks-body'>
    // on door count input
    $('#input-door-count').on('input', function() {
        // update total subscription cost text
        $('#text-door-count').text(formatNumber(Number($('#input-door-count').val())));

        // update final outputs, Software Cost Calculations
        $('#text-showdigs-cost').text(formatNumber(calculateShowdigs()));
        $('#text-competitor-cost').text(formatNumber(calculateCompetitor()));
        $('#text-software-savings').text(formatNumber(calculateSavings()));

        // update final outputs, Fieldwork Cost Calculations
        console.log(Number($('#text-gas-savings').val()));        
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));

    });

    // on annual turnover rate input 
    $('#input-annual-turnover-rate').on('input', function() {
        // update annual turnover rate
        $('#text-annual-turnover-rate').text(formatNumber(Number($('#input-annual-turnover-rate').val())));

        console.log("this is annual turnover rate");
        console.log(Number($('#input-annual-turnover-rate').val()));
    });

    // on portfolio radius input
    $('#input-portfolio-radius').on('input', function() {
        // update portfolio radius
        $('#text-portfolio-radius').text(formatNumber(Number($('#input-portfolio-radius').val())));

        console.log("this is portfolio radius");
        console.log(Number($('#input-portfolio-radius').val()));
        
        
        // update final outputs, Fieldwork Cost Calculations
        console.log(Number($('#text-gas-savings').val()));        
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));

    });

    // on showings to rent input
    $('#input-showings-to-rent').on('input', function() {
    
    
        // update final outputs, Fieldwork Cost Calculations
        console.log(Number($('#text-gas-savings').val()));        
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));

    });

    // offload percentage for showings
    $('#input-offload-percentage').on('input', function() {
        $('#text-offload-percentage').text(formatNumber(Number($('#input-offload-percentage').val())));

        console.log("this is offload percentage");
        console.log(Number($('#input-offload-percentage').val()));

        // update final outputs, Fieldwork Cost Calculations
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));
    });

    // on in-house hourly rate input
    $('#input-in-house-hourly').on('input', function() {

    });

    // on units leased input
    $('#input-units-leased-per-year').on('input', function() {
        // update final outputs, Fieldwork Cost Calculations
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));
    });

    // on condition reports input
    $('#input-condition-reports').on('input', function() {

        // update final outputs, Fieldwork Cost Calculations
        $('#text-gas-savings').text(formatNumber(totalGasSavings()));


    });

    // on condition reports offload percentage
    $('#input-condition-reports-offload-percentage').on('input', function() {
        $('#text-condition-reports-offload-percentage').text(formatNumber(Number($('#input-condition-reports-offload-percentage').val())));
        // console.log("this is condition reports offload percentage");
        // console.log(Number($('#input-condition-reports-offload-percentage').val()));
    });

    // -- FORMULAS -- 

    // retrieve the average distance value based on portfoio radius input
    function getAverageDistance() {
		// var avgDistance = 50;

        let avgDistance;
        switch (avgDistance) {
            case Number($('#input-portfolio-radius').val()) < 30:
                avgDistance = 85;
                break;
            case 40 > Number($('#input-portfolio-radius').val()) >= 30:
                avgDistance = 70;
                break;
            case 50 > Number($('#input-portfolio-radius').val()) >= 40:
                avgDistance = 60;
            	break;
            case Number($('#input-portfolio-radius').val()) >= 50:
                avgDistance = 50;
            	break;
        	default:
            	avgDistance = 85;
        }
        
        return avgDistance;
    }
    // Formula: (Total Miles Commuting * Offload % to Showdigs Agents) * IRS Reimbursement
    function totalGasSavings() {
        var totalMiles = calculateTotalMilesInCar();
		console.log("this is " + totalMiles);

        var offloadPercent = Number($('#input-offload-percentage').val());

    	var irsReimbursement = .65;
        
        // Default
        var savings = "--"

    	savings = totalMiles * offloadPercent/100 * irsReimbursement;
    
    	console.log("This is Gas Savings");
    	console.log(savings);
		
        savings = (Math.round(savings * 100) / 100).toFixed(2);

		console.log("This is Gas Savings rounded");
    	console.log(savings);
        
        return savings;

		// return savings;
    	// return formatNumber(Number($(savings).val()));
    }

    function totalWageSavings() {
		var turnoverRate = Number($('#input-offload-percentage').val());
        var doorCount = Number($('#input-door-count').val());
        var showingsToRent = Number($('#input-showings-to-rent').val());
        var touringTime = touringCount * 30 / 60;
        var tourCount = doorCount * turnoverRate * showingsToRent;
        var daysReturned = ;
        var conditionReportCount = Number($('#input-condition-reports').val());
        var conditionOffload = Number($('#input-condition-reports-offload-percentage').val())/100;
        var portfolioRadius = Number($('#input-portfolio-radius').val());
        var portfolioRange = getAverageDistance();
        var commuteTime = 3.5;
        
        
        var wageSavings = (((turnoverRate * doorCount) * (showings / 2) * (portfolioRange  * portfolioRadius * 2) * (commuteTime) / 60) + touringTime) * daysReturned * tourCount + ((conditionReportCount * 2 * portfolioRadius * portfolioRange * commuteTime) / 60) + conditionReportCount) * conditionOffload * 20;
        
        savings = (Math.round(wageSavings * 100) / 100).toFixed(2);
        
        return wageSavings;
       
    }

    function totalSavings() {

    }


    function calculateTotalMilesInCar() {
        //Formula: Units Leased per Year * (# of Showings to Place Tenant / 2) * Radius of Portfolio * Avg. Distance * 2
        // + (Total Condition Reports * 2 * Radius of Portfolio * Avg. Distance)

        // get doorCount value
        var doorCount = Number($('#input-door-count').val());

        var annualTurnoverRate = Number($('#input-offload-percentage').val());

        var unitsLeased = doorCount * annualTurnoverRate/100;

        var showingCount = Number($('#input-showings-to-rent').val());
        
        var showingOffload = Number($('#input-offload-percentage').val()) / 100;

        var portfolioRadius = Number($('#input-portfolio-radius').val());

        var conditionReports = Number($('#input-condition-reports').val());

        var conditionReportOffload = Number($('#input-condition-reports-offload-percentage').val())/100;

        var averageDistance = getAverageDistance();

        var totalMiles = (unitsLeased * showingCount * portfolioRadius * (averageDistance/100)) + (conditionReports * 2 * portfolioRadius * (averageDistance/100));

        return totalMiles;

    }

    function calculateTotalTimeInCar() {
        // function can't call function? test
        // var totalMiles = calculateTotalMiles(); 
        // console.log("this is the total miles");
        // console.log(totalMiles);

        var doorCount = Number($('#input-door-count').val());
        var annualTurnoverRate = Number($('#input-offload-percentage').val());
        var unitsLeased = doorCount * annualTurnoverRate
        var showingCount = Number($('#input-showings-to-rent').val());
        var portfolioRadius = Number($('#input-portfolio-radius').val());

        // var averageRange

        // store totalMilesInCar
        var totalMiles = unitsLeased * showingCount * portfolioRadius * .35;

        // assuming average time spent commuting per mile is 3.5
        var totalTime = totalMiles * 3.5 / 60;

        return totalTime;
    }

    function totalTimeSpentTouring() {
        var doorCount = Number($('#input-door-count').val());
        var annualTurnoverRate = Number($('#input-offload-percentage').val());
        var unitsLeased = doorCount * annualTurnoverRate

        var showingCount = Number($('#input-showings-to-rent').val());

        var touringTime = unitsLeased * showingCount;

        return touringTime;
    }

    function totalConditionReports() {
        // input-condition-reports
        var doorCount = Number($('#input-condition-reports-').val());
        
        return doorCount

    }

    function calculateTimeSavings() {
    	var doorCount = Number($('#input-door-count').val());
		var timeInCar = calculateTotalTimeInCar();
        var timeShowing = calculateTimeSpentTouring();
        var showingOffload = Number($('#input-offload-percentage').val())/100;
        var conditionOffload = Number($('#input-condition-reports-offload-percentage').val())/100;
        var conditionReports = Number($('#input-condition-reports').val());
        var timeInCarReports = conditionReports * doorCount;
        
        var timeSavings = (timeInCar + timeShowing) * showingOffload + (timeInCarReports + timeInCarReports) * conditionOffload;
        
        return timeSavings;
    }

    // calculate subcription cost
    function calculateShowdigs() {
        // get doorCount value
        var doorCount = Number($('#input-door-count').val());

        console.log(doorCount);

        if (doorCount < 24) {
            doorCount = 0; 
        }

        var cost = ((50 * 12) + (doorCount * .3 * 20))

        console.log(cost);

        // $50 Monthly Subscription Cost * 12 Months + (# of Showdigs Agent Showings * $20 Activation per Door)
        return cost;
    }

    // calculate Tenant Turner subscription cost
    function calculateCompetitor() {
        //get doorCount value
        var doorCount = Number($('#input-door-count').val());

        // 
        var cost = doorCount * 12;

        // $1 * Active Units * 12 Months
        return cost;
    }

    // calculate Showmojo subcription cost
    function calculateSavings() {

        var doorCount = Number($('#input-door-count').val());

        var showdigsCost = ((50 * 12) + (doorCount * .3 * 20));

        var competitorCost = doorCount * 12;

        var cost = Math.abs(competitorCost - showdigsCost);

        if (showdigsCost > competitorCost) {
            cost = 0;
        }

        // Showmojo Subcription 
        return cost;
    }

    // format number function
    // e.g. 3500 becomes 3,500
    function formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }
</script>
