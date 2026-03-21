import AccessControl "./access-control";
import Runtime "mo:core/Runtime";

mixin (accessControlState : AccessControl.AccessControlState) {
  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // Safe version: returns false instead of trapping for unregistered callers
  public query ({ caller }) func isCallerAdmin() : async Bool {
    switch (accessControlState.userRoles.get(caller)) {
      case (null) { false };
      case (?role) { role == #admin };
    };
  };

  // Returns true if any admin has been assigned
  public query func hasAdmin() : async Bool {
    accessControlState.adminAssigned
  };

  // First caller to invoke this becomes admin; returns false if an admin already exists
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (accessControlState.adminAssigned) { return false };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    true
  };

  // Existing admin can grant admin role to another principal
  public shared ({ caller }) func addAdmin(newAdmin : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add admins");
    };
    accessControlState.userRoles.add(newAdmin, #admin);
  };

  // Existing admin can remove another admin
  public shared ({ caller }) func removeAdmin(target : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove admins");
    };
    accessControlState.userRoles.remove(target);
  };
};
