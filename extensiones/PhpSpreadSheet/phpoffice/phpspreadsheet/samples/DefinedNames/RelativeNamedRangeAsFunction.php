<?php

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\NamedFormula;
use PhpOffice\PhpSpreadsheet\NamedRange;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

error_reporting(E_ALL);
set_time_limit(0);

date_default_timezone_set('UTC');

// Adjust the path as required to reference the PHPSpreadsheet Bootstrap file
require_once __DIR__ . '/../Bootstrap.php';

$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->setActiveSheetIndex(0);

// Set up some basic data for a timesheet
$worksheet
    ->setCellValue('A1', 'Charge Rate/hour:')
    ->setCellValue('B1', '7.50')
    ->setCellValue('A3', 'Date')
    ->setCellValue('B3', 'Hours')
    ->setCellValue('C3', 'Charge');

// Define named ranges
// CHARGE_RATE is an absolute cell reference that always points to cell B1
$spreadsheet->addNamedRange(new NamedRange('CHARGE_RATE', $worksheet, '=$B$1'));
// HOURS_PER_DAY is a relative cell reference that always points to column B, but to a cell in the row where it is used
$spreadsheet->addNamedRange(new NamedRange('HOURS_PER_DAY', $worksheet, '=$B1'));

$workHours = [
    '2020-0-06' => 7.5,
    '2020-0-07' => 7.25,
    '2020-0-08' => 6.5,
    '2020-0-09' => 7.0,
    '2020-0-10' => 5.5,
];

// Populate the Timesheet
$startRow = 4;
$row = $startRow;
foreach ($workHours as $date => $hours) {
    $worksheet
        ->setCellValue("A{$row}", $date)
        ->setCellValue("B{$row}", $hours)
        ->setCellValue("C{$row}", '=HOURS_PER_DAY*CHARGE_RATE');
    ++$row;
}
$endRow = $row - 1;

// COLUMN_TOTAL is another relative cell reference that always points to the same range of rows but to cell in the column where it is used
// To avoid including the current row,or having to hard-code the range itself (as we did in the previous example)
//    we wrap it in a named formula using the OFFSET() function
$spreadsheet->addNamedFormula(new NamedFormula('COLUMN_DATA_VALUES', $worksheet, '=OFFSET(A$4:A1, -1, 0)'));

++$row;
$worksheet
    ->setCellValue("B{$row}", '=SUM(COLUMN_DATA_VALUES)')
    ->setCellValue("C{$row}", '=SUM(COLUMN_DATA_VALUES)');

echo sprintf(
    'Worked %.2f hours at a rate of %.2f - Charge to the client is %.2f',
    $worksheet->getCell("B{$row}")->getCalculatedValue(),
    $worksheet->getCell('B1')->getValue(),
    $worksheet->getCell("C{$row}")->getCalculatedValue()
), PHP_EOL;

$outputFileName = 'RelativeNamedRangeAsFunction.xlsx';
$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save($outputFileName);
