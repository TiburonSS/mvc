ALTER TABLE SPR_PERIOD
    ADD RKD SMALLINTD;

alter table SPR_PERIOD
alter PERIOD position 1;

alter table SPR_PERIOD
alter NAIMENOVANIE position 2;

alter table SPR_PERIOD
alter DATAN position 3;

alter table SPR_PERIOD
alter DATAK position 4;

alter table SPR_PERIOD
alter RKD position 5;

alter table SPR_PERIOD
alter US position 6;

alter table SPR_PERIOD
alter TS position 7;

update spr_period  set rkd = datak-datan+1;
