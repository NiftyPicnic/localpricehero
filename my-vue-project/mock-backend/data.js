// Data object
const data = {
    locations: [
        "London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol", 
        "Edinburgh", "Newcastle", "Cardiff", "Belfast", "Sheffield", "Leeds", 
        "Southampton", "Nottingham", "Leicester", "Aberdeen", "Cambridge", 
        "Oxford", "Reading", "Brighton", "York", "Swansea", "Coventry", 
        "Stoke-on-Trent", "Hull", "Plymouth", "Norwich", "Derby", "Dundee", 
        "Exeter", "Wolverhampton", "Sunderland", "Luton", "Middlesbrough", 
        "Warrington", "Ipswich", "Chelmsford", "Doncaster", "Worcester", 
        "Milton Keynes", "Salford", "Basingstoke", "Canterbury", "Chichester", 
        "Ely", "Wells", "Woking"// ... your locations ...
    ],
    sizes: [  // Corrected to use colon
    "10sqft", "15sqft", "25sqft", "35sqft", "50sqft", "75sqft", "100sqft", 
    "125sqft", "150sqft", "175sqft", "200sqft", "250sqft", "300sqft", "500sqft"
    ],
    prices: [  // Corrected to use colon
    { location: "London", prices: { "10sqft": "£70", "15sqft": "£90", "25sqft": "£110", "35sqft": "£130", "50sqft": "£150", "75sqft": "£170", "100sqft": "£190", "125sqft": "£210", "150sqft": "£230", "175sqft": "£250", "200sqft": "£270", "250sqft": "£290", "300sqft": "£310", "500sqft": "£330" }},
    { location: "Birmingham", prices: { "10sqft": "£65", "15sqft": "£85", "25sqft": "£105", "35sqft": "£125", "50sqft": "£145", "75sqft": "£165", "100sqft": "£185", "125sqft": "£205", "150sqft": "£225", "175sqft": "£245", "200sqft": "£265", "250sqft": "£285", "300sqft": "£305", "500sqft": "£325" }},
    { location: "Manchester", prices: { "10sqft": "£68.00", "15sqft": "£88.00", "25sqft": "£103.00", "35sqft": "£123.00", "50sqft": "£143.00", "75sqft": "£163.00", "100sqft": "£183.00", "125sqft": "£203.00", "150sqft": "£223.00", "175sqft": "£243.00", "200sqft": "£263.00", "250sqft": "£283.00", "300sqft": "£303.00", "500sqft": "£323.00" }},
    { location: "Glasgow", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£104.00", "35sqft": "£124.00", "50sqft": "£144.00", "75sqft": "£200.00", "100sqft": "£184.00", "125sqft": "£204.00", "150sqft": "£224.00", "175sqft": "£244.00", "200sqft": "£264.00", "250sqft": "£284.00", "300sqft": "£304.00", "500sqft": "£324.00" }},
    { location: "Liverpool", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£102.00", "35sqft": "£122.00", "50sqft": "£142.00", "75sqft": "£162.00", "100sqft": "£182.00", "125sqft": "£202.00", "150sqft": "£222.00", "175sqft": "£242.00", "200sqft": "£262.00", "250sqft": "£282.00", "300sqft": "£302.00", "500sqft": "£322.00" }},
    { location: "Bristol", prices: { "10sqft": "£70.00", "15sqft": "£90.00", "25sqft": "£105.00", "35sqft": "£125.00", "50sqft": "£145.00", "75sqft": "£165.00", "100sqft": "£185.00", "125sqft": "£205.00", "150sqft": "£225.00", "175sqft": "£245.00", "200sqft": "£265.00", "250sqft": "£285.00", "300sqft": "£305.00", "500sqft": "£325.00" }},
    { location: "Edinburgh", prices: { "10sqft": "£66.00", "15sqft": "£86.00", "25sqft": "£101.00", "35sqft": "£121.00", "50sqft": "£141.00", "75sqft": "£161.00", "100sqft": "£181.00", "125sqft": "£201.00", "150sqft": "£221.00", "175sqft": "£241.00", "200sqft": "£261.00", "250sqft": "£281.00", "300sqft": "£301.00", "500sqft": "£321.00" }},
    { location: "Newcastle", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Cardiff", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Belfast", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£109.00", "35sqft": "£129.00", "50sqft": "£149.00", "75sqft": "£169.00", "100sqft": "£189.00", "125sqft": "£209.00", "150sqft": "£229.00", "175sqft": "£249.00", "200sqft": "£269.00", "250sqft": "£319.00", "300sqft": "£369.00", "500sqft": "£969.00" }},
    { location: "Sheffield", prices: { "10sqft": "£68.50", "15sqft": "£88.50", "25sqft": "£108.50", "35sqft": "£128.50", "50sqft": "£148.50", "75sqft": "£168.50", "100sqft": "£188.50", "125sqft": "£208.50", "150sqft": "£228.50", "175sqft": "£248.50", "200sqft": "£268.50", "250sqft": "£318.50", "300sqft": "£368.50", "500sqft": "£968.50" }},
    { location: "Leeds", prices: { "10sqft": "£65.50", "15sqft": "£85.50", "25sqft": "£105.50", "35sqft": "£125.50", "50sqft": "£145.50", "75sqft": "£165.50", "100sqft": "£185.50", "125sqft": "£205.50", "150sqft": "£225.50", "175sqft": "£245.50", "200sqft": "£265.50", "250sqft": "£315.50", "300sqft": "£365.50", "500sqft": "£965.50"  }},
    { location: "Southampton", prices: { "10sqft": "£66.50", "15sqft": "£86.50", "25sqft": "£106.50", "35sqft": "£126.50", "50sqft": "£146.50", "75sqft": "£166.50", "100sqft": "£186.50", "125sqft": "£206.50", "150sqft": "£226.50", "175sqft": "£246.50", "200sqft": "£266.50", "250sqft": "£316.50", "300sqft": "£366.50", "500sqft": "£2050.00"  }},
    { location: "Nottingham", prices: { "10sqft": "£41.00", "15sqft": "£61.00", "25sqft": "£102.00", "35sqft": "£143.00", "50sqft": "£205.00", "75sqft": "£307.00", "100sqft": "£410.00", "125sqft": "£512.00", "150sqft": "£615.00", "175sqft": "£717.00", "200sqft": "£820.00", "250sqft": "£1025.00", "300sqft": "£1230.00", "500sqft": "£2050.00" }},
    { location: "Leicester", prices: { "10sqft": "£40.00", "15sqft": "£60.00", "25sqft": "£100.00", "35sqft": "£140.00", "50sqft": "£200.00", "75sqft": "£300.00", "100sqft": "£400.00", "125sqft": "£500.00", "150sqft": "£600.00", "175sqft": "£700.00", "200sqft": "£800.00", "250sqft": "£1000.00", "300sqft": "£1200.00", "500sqft": "£2000.00"  }},
    { location: "Aberdeen", prices: { "10sqft": "£39.00", "15sqft": "£58.00", "25sqft": "£97.00", "35sqft": "£136.00", "50sqft": "£195.00", "75sqft": "£292.00", "100sqft": "£390.00", "125sqft": "£487.00", "150sqft": "£585.00", "175sqft": "£682.00", "200sqft": "£780.00", "250sqft": "£975.00", "300sqft": "£1170.00", "500sqft": "£1950.00" }},
    { location: "Cambridge", prices: { "10sqft": "£38.00", "15sqft": "£57.00", "25sqft": "£95.00", "35sqft": "£133.00", "50sqft": "£190.00", "75sqft": "£285.00", "100sqft": "£380.00", "125sqft": "£475.00", "150sqft": "£570.00", "175sqft": "£665.00", "200sqft": "£760.00", "250sqft": "£950.00", "300sqft": "£1140.00", "500sqft": "£1900.00" }},
    { location: "Oxford", prices: { "10sqft": "£37.00", "15sqft": "£55.00", "25sqft": "£92.00", "35sqft": "£129.00", "50sqft": "£200.00", "75sqft": "£277.00", "100sqft": "£370.00", "125sqft": "£462.00", "150sqft": "£555.00", "175sqft": "£647.00", "200sqft": "£740.00", "250sqft": "£925.00", "300sqft": "£1110.00", "500sqft": "£1850.00" }},
    { location: "Reading", prices: { "10sqft": "£68.00", "15sqft": "£88.00", "25sqft": "£103.00", "35sqft": "£123.00", "50sqft": "£143.00", "75sqft": "£200.00", "100sqft": "£183.00", "125sqft": "£203.00", "150sqft": "£223.00", "175sqft": "£243.00", "200sqft": "£263.00", "250sqft": "£283.00", "300sqft": "£303.00", "500sqft": "£323.00" }},
    { location: "Brighton", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£104.00", "35sqft": "£124.00", "50sqft": "£144.00", "75sqft": "£164.00", "100sqft": "£184.00", "125sqft": "£204.00", "150sqft": "£224.00", "175sqft": "£244.00", "200sqft": "£264.00", "250sqft": "£284.00", "300sqft": "£304.00", "500sqft": "£324.00" }},
    { location: "York", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£102.00", "35sqft": "£122.00", "50sqft": "£142.00", "75sqft": "£162.00", "100sqft": "£182.00", "125sqft": "£202.00", "150sqft": "£222.00", "175sqft": "£242.00", "200sqft": "£262.00", "250sqft": "£282.00", "300sqft": "£302.00", "500sqft": "£322.00" }},
    { location: "Swansea", prices: { "10sqft": "£70.00", "15sqft": "£90.00", "25sqft": "£105.00", "35sqft": "£125.00", "50sqft": "£145.00", "75sqft": "£165.00", "100sqft": "£185.00", "125sqft": "£205.00", "150sqft": "£225.00", "175sqft": "£245.00", "200sqft": "£265.00", "250sqft": "£285.00", "300sqft": "£305.00", "500sqft": "£325.00" }},
    { location: "Coventry", prices: { "10sqft": "£66.00", "15sqft": "£86.00", "25sqft": "£101.00", "35sqft": "£121.00", "50sqft": "£141.00", "75sqft": "£161.00", "100sqft": "£181.00", "125sqft": "£201.00", "150sqft": "£221.00", "175sqft": "£241.00", "200sqft": "£261.00", "250sqft": "£281.00", "300sqft": "£301.00", "500sqft": "£321.00" }},
    { location: "Stoke-on-Trent", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Hull", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Plymouth", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£109.00", "35sqft": "£129.00", "50sqft": "£149.00", "75sqft": "£200", "100sqft": "£189.00", "125sqft": "£209.00", "150sqft": "£229.00", "175sqft": "£249.00", "200sqft": "£269.00", "250sqft": "£319.00", "300sqft": "£369.00", "500sqft": "£969.00" }},
    { location: "Norwich", prices: { "10sqft": "£68.50", "15sqft": "£88.50", "25sqft": "£108.50", "35sqft": "£128.50", "50sqft": "£148.50", "75sqft": "£168.50", "100sqft": "£188.50", "125sqft": "£208.50", "150sqft": "£228.50", "175sqft": "£248.50", "200sqft": "£268.50", "250sqft": "£318.50", "300sqft": "£368.50", "500sqft": "£968.50" }},
    { location: "Derby", prices: { "10sqft": "£65.50", "15sqft": "£85.50", "25sqft": "£105.50", "35sqft": "£125.50", "50sqft": "£145.50", "75sqft": "£165.50", "100sqft": "£200.50", "125sqft": "£205.50", "150sqft": "£225.50", "175sqft": "£245.50", "200sqft": "£265.50", "250sqft": "£315.50", "300sqft": "£365.50", "500sqft": "£965.50" }},
    { location: "Dundee", prices: { "10sqft": "£66.50", "15sqft": "£86.50", "25sqft": "£106.50", "35sqft": "£126.50", "50sqft": "£146.50", "75sqft": "£166.50", "100sqft": "£186.50", "125sqft": "£206.50", "150sqft": "£226.50", "175sqft": "£246.50", "200sqft": "£266.50", "250sqft": "£316.50", "300sqft": "£366.50", "500sqft": "£2050.00" }},
    { location: "Exeter", prices: { "10sqft": "£41.00", "15sqft": "£61.00", "25sqft": "£102.00", "35sqft": "£143.00", "50sqft": "£205.00", "75sqft": "£307.00", "100sqft": "£410.00", "125sqft": "£512.00", "150sqft": "£615.00", "175sqft": "£717.00", "200sqft": "£820.00", "250sqft": "£1025.00", "300sqft": "£1230.00", "500sqft": "£2050.00" }},
    { location: "Wolverhampton", prices: { "10sqft": "£40.00", "15sqft": "£60.00", "25sqft": "£100.00", "35sqft": "£140.00", "50sqft": "£200.00", "75sqft": "£300.00", "100sqft": "£400.00", "125sqft": "£500.00", "150sqft": "£600.00", "175sqft": "£700.00", "200sqft": "£800.00", "250sqft": "£1000.00", "300sqft": "£1200.00", "500sqft": "£2000.00" }},
    { location: "Sunderland", prices: { "10sqft": "£39.00", "15sqft": "£58.00", "25sqft": "£97.00", "35sqft": "£136.00", "50sqft": "£195.00", "75sqft": "£292.00", "100sqft": "£390.00", "125sqft": "£487.00", "150sqft": "£585.00", "175sqft": "£682.00", "200sqft": "£780.00", "250sqft": "£975.00", "300sqft": "£1170.00", "500sqft": "£1950.00" }},
    { location: "Luton", prices: { "10sqft": "£38.00", "15sqft": "£57.00", "25sqft": "£95.00", "35sqft": "£133.00", "50sqft": "£190.00", "75sqft": "£285.00", "100sqft": "£380.00", "125sqft": "£475.00", "150sqft": "£570.00", "175sqft": "£665.00", "200sqft": "£760.00", "250sqft": "£950.00", "300sqft": "£1140.00", "500sqft": "£1900.00"  }},
    { location: "Middlesbrough", prices: { "10sqft": "£37.00", "15sqft": "£55.00", "25sqft": "£92.00", "35sqft": "£129.00", "50sqft": "£185.00", "75sqft": "£277.00", "100sqft": "£370.00", "125sqft": "£462.00", "150sqft": "£555.00", "175sqft": "£647.00", "200sqft": "£740.00", "250sqft": "£925.00", "300sqft": "£1110.00", "500sqft": "£1850.00" }},
    { location: "Warrington", prices: { "10sqft": "£68.00", "15sqft": "£88.00", "25sqft": "£103.00", "35sqft": "£123.00", "50sqft": "£143.00", "75sqft": "£163.00", "100sqft": "£183.00", "125sqft": "£203.00", "150sqft": "£223.00", "175sqft": "£243.00", "200sqft": "£263.00", "250sqft": "£283.00", "300sqft": "£303.00", "500sqft": "£323.00"  }},
    { location: "Ipswich", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£104.00", "35sqft": "£124.00", "50sqft": "£144.00", "75sqft": "£200.00", "100sqft": "£184.00", "125sqft": "£204.00", "150sqft": "£224.00", "175sqft": "£244.00", "200sqft": "£264.00", "250sqft": "£284.00", "300sqft": "£304.00", "500sqft": "£324.00" }},
    { location: "Chelmsford", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£102.00", "35sqft": "£122.00", "50sqft": "£142.00", "75sqft": "£162.00", "100sqft": "£182.00", "125sqft": "£202.00", "150sqft": "£222.00", "175sqft": "£242.00", "200sqft": "£262.00", "250sqft": "£282.00", "300sqft": "£302.00", "500sqft": "£322.00" }},
    { location: "Doncaster", prices: { "10sqft": "£70.00", "15sqft": "£90.00", "25sqft": "£105.00", "35sqft": "£125.00", "50sqft": "£145.00", "75sqft": "£165.00", "100sqft": "£185.00", "125sqft": "£205.00", "150sqft": "£225.00", "175sqft": "£245.00", "200sqft": "£265.00", "250sqft": "£285.00", "300sqft": "£305.00", "500sqft": "£325.00" }},
    { location: "Worcester", prices: { "10sqft": "£66.00", "15sqft": "£86.00", "25sqft": "£101.00", "35sqft": "£121.00", "50sqft": "£141.00", "75sqft": "£161.00", "100sqft": "£181.00", "125sqft": "£201.00", "150sqft": "£221.00", "175sqft": "£241.00", "200sqft": "£261.00", "250sqft": "£281.00", "300sqft": "£301.00", "500sqft": "£321.00" }},
    { location: "Milton Keynes", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Salford", prices: { "10sqft": "£67.00", "15sqft": "£87.00", "25sqft": "£107.00", "35sqft": "£127.00", "50sqft": "£147.00", "75sqft": "£167.00", "100sqft": "£187.00", "125sqft": "£207.00", "150sqft": "£227.00", "175sqft": "£247.00", "200sqft": "£267.00", "250sqft": "£317.00", "300sqft": "£367.00", "500sqft": "£967.00" }},
    { location: "Basingstoke", prices: { "10sqft": "£69.00", "15sqft": "£89.00", "25sqft": "£109.00", "35sqft": "£129.00", "50sqft": "£149.00", "75sqft": "£169.00", "100sqft": "£189.00", "125sqft": "£209.00", "150sqft": "£229.00", "175sqft": "£249.00", "200sqft": "£269.00", "250sqft": "£319.00", "300sqft": "£369.00", "500sqft": "£969.00" }},
    { location: "Canterbury", prices: { "10sqft": "£68.50", "15sqft": "£88.50", "25sqft": "£108.50", "35sqft": "£128.50", "50sqft": "£148.50", "75sqft": "£168.50", "100sqft": "£188.50", "125sqft": "£208.50", "150sqft": "£228.50", "175sqft": "£248.50", "200sqft": "£268.50", "250sqft": "£318.50", "300sqft": "£368.50", "500sqft": "£968.50"  }},
    { location: "Chichester", prices: { "10sqft": "£65.50", "15sqft": "£85.50", "25sqft": "£105.50", "35sqft": "£125.50", "50sqft": "£145.50", "75sqft": "£165.50", "100sqft": "£185.50", "125sqft": "£205.50", "150sqft": "£225.50", "175sqft": "£245.50", "200sqft": "£265.50", "250sqft": "£315.50", "300sqft": "£365.50", "500sqft": "£965.50" }},
    { location: "Ely", prices: { "10sqft": "£66.50", "15sqft": "£86.50", "25sqft": "£106.50", "35sqft": "£126.50", "50sqft": "£146.50", "75sqft": "£166.50", "100sqft": "£186.50", "125sqft": "£206.50", "150sqft": "£226.50", "175sqft": "£246.50", "200sqft": "£266.50", "250sqft": "£316.50", "300sqft": "£366.50", "500sqft": "£2050.00"  }},
    { location: "Wells", prices: { "10sqft": "£41.00", "15sqft": "£61.00", "25sqft": "£102.00", "35sqft": "£143.00", "50sqft": "£205.00", "75sqft": "£307.00", "100sqft": "£410.00", "125sqft": "£512.00", "150sqft": "£615.00", "175sqft": "£717.00", "200sqft": "£820.00", "250sqft": "£1025.00", "300sqft": "£1230.00", "500sqft": "£2050.00" }},
    { location: "Woking", prices: { "10sqft": "£40.00", "15sqft": "£60.00", "25sqft": "£100.00", "35sqft": "£140.00", "50sqft": "£200.00", "75sqft": "£300.00", "100sqft": "£400.00", "125sqft": "£500.00", "150sqft": "£600.00", "175sqft": "£700.00", "200sqft": "£800.00", "250sqft": "£1000.00", "300sqft": "£1200.00", "500sqft": "£2000.00" }}// ... your prices ...
    ]
};

// Existing imports or other code...

// Function to get all price combinations
function getAllPriceCombinations(data) {
    let allPriceCombinations = [];
    data.prices.forEach(priceObj => {
        const location = priceObj.location;
        Object.keys(priceObj.prices).forEach(size => {
            const price = priceObj.prices[size];
            allPriceCombinations.push({ location, size, price });
        });
    });
    // Sort the price combinations in ascending order based on the price
    allPriceCombinations.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, "")));
    return allPriceCombinations;
}

// Assigning all price combinations to a property in the data object
data.allPriceCombinations = getAllPriceCombinations(data);

// Exporting the data object and the utility functions
module.exports = {
    data, // the main data object
    getAllPriceCombinations // utility function for generating all price combinations
};

// Other code...
