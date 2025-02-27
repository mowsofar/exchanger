import styled from "styled-components";
import { TableHeader, TableRow } from "../../components/Table/Table";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
    height: 100vh;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 70px 1fr 350px 350px 60px 60px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 70px 1fr 350px 350px 60px 60px;
    padding: 0 16px;
    padding-right: 23px;
`;

export const StyledImg = styled.img`
    height: 45px;
    width: 45px;
`;