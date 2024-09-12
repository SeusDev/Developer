USE [SEUSSERVER]
GO
/****** Object:  StoredProcedure [dbo].[Monitor]    Script Date: 2/01/2024 6:08:42 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Monitor]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        es.session_id AS 'ID de Sesión',
        es.open_transaction_count AS 'Contador de Transacciones Abiertas',
        es.status AS 'Estado',
        CASE 
            WHEN es.transaction_id > 0 THEN 'Transacción de Usuario'
            ELSE 'Transacción de Sistema'
        END AS 'Tipo de Transacción',
        COALESCE(tx.text, '') AS 'Consulta Ejecutada', -- Muestra el texto del script ejecutado
        es.transaction_isolation_level AS 'Nivel de Aislamiento'
    FROM sys.dm_exec_requests es
    CROSS APPLY sys.dm_exec_sql_text(es.sql_handle) tx
    WHERE es.transaction_id IS NOT NULL; -- Filtra las transacciones activas
END;
