USE [Skandias_Lappiz]
GO
/****** Object:  StoredProcedure [dbo].[Skandia_Lappiz_UnlockUser]    Script Date: 3/11/2022 8:13:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Skandia_Lappiz_UnlockUser]
@IdUser UNIQUEIDENTIFIER
AS
BEGIN
    Update [LappizV2Prod].[dbo].[AspNetUSers] set lockoutenddateUtc = null where Id = @IdUser
END



USE [Skandias_Lappiz]
GO
/****** Object:  StoredProcedure [dbo].[Skandia_Lappiz_UnlockUser]    Script Date: 3/11/2022 8:13:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Skandia_Lappiz_UnlockUser]
@IdUser UNIQUEIDENTIFIER
AS
BEGIN
    Update [LappizV2Prod].[dbo].[AspNetUSers] set EmailConfirmed = 1 where Id = @IdUser
END