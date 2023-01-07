export class DefaultConstants {
  public static useComments = true;

  public static defaultCountry = $localize`:@@global.country: Country`; // To retrieve from backend
  public static phonePattern = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/;
  public static phonePatternWithoutString = /^[?^A\s]*(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/;
  public static mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public static usernamePattern = /^[a-zA-Z0-9\.@]+$/;
  public static emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
  public static phoneNumberPattern = /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/i;
  public static webSitePattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;
  public static rowsNumber = 10;
  public static rowsCount = 30;
  public static rowsPerPage = [10, 20, 25, 50];
  public static datePattern = `dd/MM/yyyy`;
  public static fullDatePattern = `dd/MM/yyyy HH:mm:ss`;
  public static yearRange = '1000:3000';
  public static ribPattern = '^[0-9]{24}$';
  public static defaultStartDate = new Date('01/01/01');
  public static minYear = 1;
  public static maxYear = 9999;
  public static minYearConst = 1901;
  public static minYearAdded = 1970;
  public static datePatternCalendar = 'dd/mm/yy';
  public static monthDayPattern = 'M/d/yyyy';
  public static valid = 1;
  public static rejected = 2;
  public static awaitingValidation = 0;
  public static autoCompleteLimitation = 40;
  public static autoCompleteMaxLimitation = 100;
  public static startDateClient = '0001-01-01T00:30:20.000Z';
  public static startDateServer = '0001-01-01T00:00:00';
  public static endDate = '9999-12-31T23:59:59.9999999';
  public static maxLengthCode = 50;
  public static maxLengthDesignation = 250;
  public static maxLengthDescription = 500;
  public static amountPattern = '1.2-5';
  public static minFractionDigits = 2;
  public static noFractionDigits = 0;
  public static locale = 'fr-FR';
  public static localeEng = 'en-EN';

  public static defaultCurrency = 'Dirham marocain'; // corresponds to the base currency designation
  public static defaultCurrencySymbol = 'MAD'; // corresponds to the base currency symbol
  public static symbol = 'symbol';
  public static minYearPriceIndexValue = 2015;
  public static maxYearPriceIndexValue = 2050;
  public static labelSeparator = ' : ';
  public static limitation = 40;
  public static csvSeparator = ';';
  public static pipeSeparator = '|';
  public static timeOut = 200;
  public static sizeAutoComplete = 40;
  public static minLengthAutoComplete = 3;
  public static maxFileSize = 10000000;
  public static displayDatePattern = 'd/M/yyyy';
  public static notificationLifeTime = 4000;
  public static successNotificaationLifeTime = 1800;
  public static defaultNullValues = [undefined, null];
  public static defaultNumericNullValue = [-1, '-1', undefined, null];
  public static filterDelay = 500;
  public static bordereauTVAMinFractionDigits = 4;
  public static tvaPattern = '1.4-5';
  public static livraisonPattern = '1.2-3';
  public static tvaLocalBordereau = 'en-EN';
  public static livraisonLocale = 'en-EN';
  public static heureLivPattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]/;

  public static montantPattern = '.2-2';

  public static timePattern12 = 'hh:mm';
  public static timePattern24 = 'HH:mm';
  public static firstMinDate = '1900-01-01T00:00:00Z';
  public static secondMinDate = '1899-12-31T23:29:40Z';
  public static thirdMinDate = '1901-01-01T00:00:00Z';
  public static excelFileTypes = '.xls,.xlsx';

  public static localeEn = 'en';
  public static lettrePattern = '1.2-2';

  public static localDatePattern = `${DefaultConstants.datePattern} HH:mm`;
  public static defaultMaxInput = 99999;

  public static alert = 'Alert';
  public static workflow = 'WorkFlow';
  public static calendar = 'Calendar';
  public static traceEntity = 'TraceEntity';
  public static leaveRequests = 'LeaveRequests';

  public static guidIdPattern = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
  public static extensibilityScreensFileName = 'ExtensibilityScreens.xlsx';
  public static taskSeries = 'serie';
  public static economicPlan = 'economic'; // To be Parametred
  public static economicIRFSPlan = 'economicIRFS'; // To be Parametred
  public static rentalModule = true; // rental module is provided

  public static editMode = 'edit'; // url param for edition mode
  public static selectMode = 'select'; // url param for select mode
  public static active = 'active';
  public static maintenanceDeployedAndAssetRelated = false; // maintenance and service is delivered and the movable property is linked to a maintenance or service contract.

  public static imageNotFoundPath = 'assets/img/photo-indisponible.png';
  public static typeImage = 'image/*';

  public static personEditPath = 'person/:id/edit';
  public static companyEditPath = 'company/:id/edit';
  public static reformEditPath = 'reform/:id/edit';
  public static accountingAssetClassName = 'AccountingAssetDataModel';
  public static baseAssetClassName = 'BaseAssetDataModel';
  public static language = 'fr';
  public static shortDateWithoutYearFormat = 'dd/mm/yy';
  public static fullDateFormat = 'dd/mm/yy';
  public static fullDateWithoutYearFormat = 'dd/mm/yy';
  public static shortHourFormat = 'HH:mm';
  public static hourFormat = 'HH';
  public static minuteFormat = 'mm';
  public static fullHourFormat = 'dd/mm/yy';
  public static timeZone = 'GMT';
  public static urlParamIdentifier = ':';
  public static slash = '/';
  public static dateTimeFilterPattern = 'yyyy-MM-ddTHH:mm';
  public static dateFilterPattern = 'yyyy-MM-dd';

  public static statusSold = 'Sold';
  public static statusReformed = 'Reformed';

  public static data = 'data';

  public static stringDatePattern = '$3-$2-$1';
  public static stringDateTimePattern = '$3-$2-$1 $4:$5';
  public static stringDateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
  public static stringDateTimeRegex = /(\d{2})\/(\d{2})\/(\d{4})\ (\d{2})\:(\d{2})/;
  public static fakePassword = '********';

  // Id
  public static departmentId = 'departmentId';
  public static productGroupId = 'productGroupId';
  public static plus = '+';
  public static minus = '-';
  public static doublePoints = ':';
  public static space = ' ';
  public static empty = '';
  public static httpPrefix = 'http://';
  public static exerciseId = 'exerciseId';
  public static propertyId = 'propertyId';
  public static comaWithSpace = ', ';
  public static order = 'Bon de livraison';
  public static invoice = 'Facture';

  // Traceability
  public static creation = 'creation';
  public static update = 'update';
  public static comma = ',';
  public static dot = '.';

  public static extensionPattern = /\.[^/.]+$/;
  public static accountingAssetId = 'accountingAssetId';
  public static accountingDocumentId = 'accountingDocumentId';
  public static transfer = 'transfer';

  public static propertyEditPath = 'property/:id/edit';
  public static assetEditPath = 'asset/:id/edit';
  public static transferEditPath = 'transfer/:id/edit';
  public static exchangeEditPath = 'exchange/:id/edit';
  public static accountingDocumentEditPath = 'accounting-document/:id/edit';
  public static accountingAssetEditPath = 'accounting-asset/:id/edit';

  public static type = 'Type';
  public static mark = 'Marque';

  // Counter
  public static system = 'System';
  /**
   * Set new values for constants
   * @param constants constants class that inherits from class: CommonConstants
   */
  public static setConstants(constants: DefaultConstants) {
    for (const attr in constants) {
      this[attr] = constants[attr];
    }
  }
}
