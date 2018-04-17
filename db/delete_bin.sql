DELETE FROM items WHERE bin_id = $1;
DELETE FROM bin WHERE bin_id = $1;