import { Request, Response, Router } from "express";
import { AuthRequest, authToken, verifyPassword } from "../middleware/authMiddleware";
import db from "../config/db";
import supabaseAdmin from "../config/supabaseAdmin";

const router = Router();

router.post("/change-identity", authToken, async (req: AuthRequest, res: Response) => {
  try {
    const userID = req.user?.userId;
    const username = req.user?.username;
    const email = req.user?.email;
    const { newUsername, newEmail, password } = req.body;

    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("encrypted_password")
      .eq("id", userID);

    if (!userData || userData.length === 0) {
      throw new Error("new username can't be empty");
    }
    const verified = await verifyPassword(
      password,
      userData[0].encrypted_password,
    );
    if (verified) {
      const { data: updateData, error: updateError } = await supabaseAdmin
        .from("users")
        .update({
          username: newUsername,
          email: newEmail,
        })
        .eq("id", userID);

      if (updateError) {
          res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: updateError.message,
          });
      }

      res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    throw error;
    
  }
});

router.post("/change-profile", authToken, async (req: AuthRequest, res: Response) => {
  try{
    const userID = req.user?.userId;
    const { displayName } = req.body;
    
    if(!displayName || displayName === ""){
      throw new Error("Name can't be empty")
    }

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        display_name: displayName
      })
      .eq("id", userID);


    if(profileError){
      res.status(500).json({success: "error"})
    }

    res.status(200).json({
      success: "true",
      new_name: displayName,
    })

  } catch(error){
    throw error;
  }
})


export default router;
