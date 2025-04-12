const SAFETY_THRESHOLDS = {
    stress: {
      warning: 50,  // MPa
      critical: 75
    },
    water: {
      warning: 2.5, // meters
      critical: 3.5
    },
    traffic: {
      warning: 300, // veh/hr
      critical: 450
    }
  };
  
  export function analyzeSafety(data) {
    let status = 'safe';
    
    if(data.stressLevel >= SAFETY_THRESHOLDS.stress.critical ||
       data.waterLevel >= SAFETY_THRESHOLDS.water.critical ||
       data.trafficDensity >= SAFETY_THRESHOLDS.traffic.critical) {
      status = 'critical';
    }
    else if(data.stressLevel >= SAFETY_THRESHOLDS.stress.warning ||
            data.waterLevel >= SAFETY_THRESHOLDS.water.warning ||
            data.trafficDensity >= SAFETY_THRESHOLDS.traffic.warning) {
      status = 'warning';
    }
  
    return {
      ...data,
      status,
      timestamp: new Date()
    };
  }