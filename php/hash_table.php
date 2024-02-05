<?php
$array = [];
$array['Germany'] = "Position 1";
$array['Argentina'] = "Position 2";
$array['Portugal'] = "Position 6";
$array['Fifa_World_Cup'] = "2018 Russia";

echo "Germany's position: " . $array['Germany'] . "\n";
echo "Argentina's position: " . $array['Argentina'] . "\n";
echo "Portugal's position: " . $array['Portugal'] . "\n";
echo "FIFA World Cup in 2018 hosted by: " . $array['Fifa_Wordl_Cup'] . "\n";

echo "All entries in the array: \n";
foreach ($array as $key => $value) {
    echo "$key: $value \n";
}
?>