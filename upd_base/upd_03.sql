/******************************************************************************/
/***               Generated by IBExpert 29.09.2015 15:08:19                ***/
/******************************************************************************/

/******************************************************************************/
/***      Following SET SQL DIALECT is just for the Database Comparer       ***/
/******************************************************************************/
SET SQL DIALECT 3;



/******************************************************************************/
/***                                 Tables                                 ***/
/******************************************************************************/



CREATE TABLE LS_BOLN (
    TABN     INTD NOT NULL /* INTD = INTEGER */,
    DATABOL  DATAD NOT NULL /* DATAD = DATE */,
    NOMER    VARCHAR25 NOT NULL /* VARCHAR25 = VARCHAR(25) */,
    DATAN    DATAD NOT NULL /* DATAD = DATE */,
    DATAK    DATAD NOT NULL /* DATAD = DATE */,
    DIAGNOZ  VARCHAR255 /* VARCHAR255 = VARCHAR(255) */
);




/******************************************************************************/
/***                              Primary keys                              ***/
/******************************************************************************/

ALTER TABLE LS_BOLN ADD CONSTRAINT PK_LS_BOLN PRIMARY KEY (TABN, DATABOL);


/******************************************************************************/
/***                               Privileges                               ***/
/******************************************************************************/